--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3

-- Started on 2024-01-31 01:33:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 225 (class 1255 OID 16459)
-- Name: check_match_player_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_match_player_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            player_team_id INT;
            matchplayer_count INT;
            max_players_per_team_in_match INT := 11;
        BEGIN
            SELECT team_id INTO player_team_id FROM "player" WHERE id = NEW.player_id;

            IF NOT EXISTS (
                SELECT 1 FROM "match_teams_team"
                WHERE match_id = NEW.match_id AND team_id = player_team_id
            ) THEN
                RAISE EXCEPTION 'Player''s team does not belong to the match';
            END IF;

    
            SELECT COUNT(*) INTO matchplayer_count
            FROM "match_players_player" MP
            INNER JOIN "player" P ON P.id = MP.player_id
            WHERE P.team_id = player_team_id AND MP.match_id = NEW.match_id;
            
            IF matchplayer_count >= max_players_per_team_in_match THEN
                RAISE EXCEPTION 'Player count from the team cannot be greater or equal than 11';
            END IF;

            RETURN NEW;
        END;
        $$;


ALTER FUNCTION public.check_match_player_insert() OWNER TO postgres;

--
-- TOC entry 224 (class 1255 OID 16457)
-- Name: check_player_limit(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_player_limit() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        DECLARE
            player_count INTEGER;
            max_players INTEGER := 20;
        BEGIN
            SELECT COUNT(*) INTO player_count FROM "player" WHERE "team_id" = NEW."team_id";

            IF player_count >= max_players THEN
                RAISE EXCEPTION 'Player limit reached for this team';
            END IF;

            RETURN NEW;
        END;
        $$;


ALTER FUNCTION public.check_player_limit() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: match; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match (
    id integer NOT NULL,
    location character varying(255) NOT NULL,
    start_date date NOT NULL,
    start_time time without time zone NOT NULL
);


ALTER TABLE public.match OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16388)
-- Name: match_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.match_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.match_id_seq OWNER TO postgres;

--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 214
-- Name: match_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.match_id_seq OWNED BY public.match.id;


--
-- TOC entry 221 (class 1259 OID 16416)
-- Name: match_players_player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match_players_player (
    match_id integer NOT NULL,
    player_id integer NOT NULL
);


ALTER TABLE public.match_players_player OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16409)
-- Name: match_teams_team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match_teams_team (
    match_id integer NOT NULL,
    team_id integer NOT NULL
);


ALTER TABLE public.match_teams_team OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16449)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16448)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 222
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 219 (class 1259 OID 16403)
-- Name: player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.player (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    surname character varying(40) NOT NULL,
    number integer NOT NULL,
    team_id integer
);


ALTER TABLE public.player OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16402)
-- Name: player_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.player_id_seq OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 218
-- Name: player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.player_id_seq OWNED BY public.player.id;


--
-- TOC entry 217 (class 1259 OID 16396)
-- Name: team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.team OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16395)
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_id_seq OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 216
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- TOC entry 3224 (class 2604 OID 16392)
-- Name: match id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match ALTER COLUMN id SET DEFAULT nextval('public.match_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16452)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 16406)
-- Name: player id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player ALTER COLUMN id SET DEFAULT nextval('public.player_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16399)
-- Name: team id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- TOC entry 3394 (class 0 OID 16389)
-- Dependencies: 215
-- Data for Name: match; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.match (id, location, start_date, start_time) FROM stdin;
1	Stadium A	2024-02-01	15:00:00
2	Stadium B	2024-02-02	18:30:00
\.


--
-- TOC entry 3400 (class 0 OID 16416)
-- Dependencies: 221
-- Data for Name: match_players_player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.match_players_player (match_id, player_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	8
1	9
1	10
1	20
1	21
1	22
1	23
1	24
1	25
\.


--
-- TOC entry 3399 (class 0 OID 16409)
-- Dependencies: 220
-- Data for Name: match_teams_team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.match_teams_team (match_id, team_id) FROM stdin;
1	1
1	2
2	1
2	2
\.


--
-- TOC entry 3402 (class 0 OID 16449)
-- Dependencies: 223
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1706209588657	AddInsertPlayerCheckTrigger1706209588657
2	1706549382905	AddInsertMatchPlayerRestrictionTrigger1706549382905
\.


--
-- TOC entry 3398 (class 0 OID 16403)
-- Dependencies: 219
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.player (id, name, surname, number, team_id) FROM stdin;
1	Player1_Team1	Surname1	1	1
2	Player2_Team1	Surname2	2	1
3	Player3_Team1	Surname3	3	1
4	Player4_Team1	Surname4	4	1
5	Player5_Team1	Surname5	5	1
6	Player6_Team1	Surname6	6	1
7	Player7_Team1	Surname7	7	1
8	Player8_Team1	Surname8	8	1
9	Player9_Team1	Surname9	9	1
10	Player10_Team1	Surname10	10	1
11	Player11_Team1	Surname11	11	1
12	Player12_Team1	Surname12	12	1
13	Player13_Team1	Surname13	13	1
14	Player1_Team2	Surname1	1	2
15	Player2_Team2	Surname2	2	2
16	Player3_Team2	Surname3	3	2
17	Player4_Team2	Surname4	4	2
18	Player5_Team2	Surname5	5	2
19	Player6_Team2	Surname6	6	2
20	Player7_Team2	Surname7	7	2
21	Player8_Team2	Surname8	8	2
22	Player9_Team2	Surname9	9	2
23	Player10_Team2	Surname10	10	2
24	Player11_Team2	Surname11	11	2
25	Player12_Team2	Surname12	12	2
26	Player13_Team2	Surname13	13	2
43	test	Surname1	1	3
\.


--
-- TOC entry 3396 (class 0 OID 16396)
-- Dependencies: 217
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team (id, name) FROM stdin;
1	A
2	B
3	C
\.


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 214
-- Name: match_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.match_id_seq', 1, false);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 222
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 218
-- Name: player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.player_id_seq', 1, false);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 216
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.team_id_seq', 1, false);


--
-- TOC entry 3241 (class 2606 OID 16420)
-- Name: match_players_player PK_0291aed8e788bc366d9a196aafc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_players_player
    ADD CONSTRAINT "PK_0291aed8e788bc366d9a196aafc" PRIMARY KEY (match_id, player_id);


--
-- TOC entry 3233 (class 2606 OID 16408)
-- Name: player PK_65edadc946a7faf4b638d5e8885; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16456)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 16394)
-- Name: match PK_92b6c3a6631dd5b24a67c69f69d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match
    ADD CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16413)
-- Name: match_teams_team PK_a71a4ae898d372751dd7483801d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_teams_team
    ADD CONSTRAINT "PK_a71a4ae898d372751dd7483801d" PRIMARY KEY (match_id, team_id);


--
-- TOC entry 3231 (class 2606 OID 16401)
-- Name: team PK_f57d8293406df4af348402e4b74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY (id);


--
-- TOC entry 3234 (class 1259 OID 16415)
-- Name: IDX_1acf520f64acc37c5c76ade2e3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_1acf520f64acc37c5c76ade2e3" ON public.match_teams_team USING btree (team_id);


--
-- TOC entry 3238 (class 1259 OID 16421)
-- Name: IDX_2bbd9a9402a2ed297b9d3b86a0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_2bbd9a9402a2ed297b9d3b86a0" ON public.match_players_player USING btree (match_id);


--
-- TOC entry 3235 (class 1259 OID 16414)
-- Name: IDX_863dc1ceb0b3935f3ceb3c95a9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_863dc1ceb0b3935f3ceb3c95a9" ON public.match_teams_team USING btree (match_id);


--
-- TOC entry 3239 (class 1259 OID 16422)
-- Name: IDX_ed49e70ba9b261863c91be8ed5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_ed49e70ba9b261863c91be8ed5" ON public.match_players_player USING btree (player_id);


--
-- TOC entry 3250 (class 2620 OID 16460)
-- Name: match_players_player match_player_insert_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER match_player_insert_trigger BEFORE INSERT ON public.match_players_player FOR EACH ROW EXECUTE FUNCTION public.check_match_player_insert();


--
-- TOC entry 3249 (class 2620 OID 16458)
-- Name: player player_limit_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER player_limit_trigger BEFORE INSERT ON public.player FOR EACH ROW EXECUTE FUNCTION public.check_player_limit();


--
-- TOC entry 3245 (class 2606 OID 16433)
-- Name: match_teams_team FK_1acf520f64acc37c5c76ade2e33; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_teams_team
    ADD CONSTRAINT "FK_1acf520f64acc37c5c76ade2e33" FOREIGN KEY (team_id) REFERENCES public.team(id);


--
-- TOC entry 3247 (class 2606 OID 16438)
-- Name: match_players_player FK_2bbd9a9402a2ed297b9d3b86a0c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_players_player
    ADD CONSTRAINT "FK_2bbd9a9402a2ed297b9d3b86a0c" FOREIGN KEY (match_id) REFERENCES public.match(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3246 (class 2606 OID 16428)
-- Name: match_teams_team FK_863dc1ceb0b3935f3ceb3c95a9b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_teams_team
    ADD CONSTRAINT "FK_863dc1ceb0b3935f3ceb3c95a9b" FOREIGN KEY (match_id) REFERENCES public.match(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3244 (class 2606 OID 16423)
-- Name: player FK_9deb77a11ad43ce17975f13dc85; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT "FK_9deb77a11ad43ce17975f13dc85" FOREIGN KEY (team_id) REFERENCES public.team(id);


--
-- TOC entry 3248 (class 2606 OID 16443)
-- Name: match_players_player FK_ed49e70ba9b261863c91be8ed5f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_players_player
    ADD CONSTRAINT "FK_ed49e70ba9b261863c91be8ed5f" FOREIGN KEY (player_id) REFERENCES public.player(id);


-- Completed on 2024-01-31 01:33:25

--
-- PostgreSQL database dump complete
--

