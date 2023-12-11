CREATE SCHEMA IF NOT EXISTS "public";

CREATE SEQUENCE "public".account_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".article_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".article_supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".bon_entree_details_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".bon_entree_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".bon_sortie_details_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".bon_sortie_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".company_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".department_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".department_needs_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".magasin_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_id_article_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_need_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proforma_send_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proforma_send_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proformat_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proformat_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".purchase order_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public"."purchase order_details_id_seq" START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".purchase_order_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE  TABLE "public".article ( 
	id                   integer DEFAULT nextval('article_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	unit                 varchar  NOT NULL  ,
	CONSTRAINT pk_article PRIMARY KEY ( id )
 );

CREATE  TABLE "public".company ( 
	id                   serial DEFAULT nextval('company_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	address              varchar(100)  NOT NULL  ,
	tel                  varchar  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	CONSTRAINT pk_company PRIMARY KEY ( id )
 );

CREATE  TABLE "public".department ( 
	id                   integer DEFAULT nextval('department_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	CONSTRAINT pk_department PRIMARY KEY ( id )
 );

CREATE  TABLE "public".department_needs ( 
	id                   integer DEFAULT nextval('department_needs_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	id_department        integer  NOT NULL  ,
	CONSTRAINT pk_needs PRIMARY KEY ( id ),
	CONSTRAINT fk_department_needs_department FOREIGN KEY ( id_department ) REFERENCES "public".department( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".magasin ( 
	id                   serial DEFAULT nextval('magasin_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)    ,
	CONSTRAINT magasin_pkey PRIMARY KEY ( id )
 );

CREATE  TABLE "public".need_details ( 
	id                   integer DEFAULT nextval('need_details_id_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	motif                varchar  NOT NULL  ,
	date_need            date  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	id_department_needs  integer  NOT NULL  ,
	CONSTRAINT pk_need_details PRIMARY KEY ( id ),
	CONSTRAINT fk_need_details_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_details_department_needs FOREIGN KEY ( id_department_needs ) REFERENCES "public".department_needs( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".need_group ( 
	id                   serial DEFAULT nextval('need_group_id_seq'::regclass) NOT NULL  ,
	numero               varchar(100)  NOT NULL  ,
	id_article           serial DEFAULT nextval('need_group_id_article_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	final_date_need      date  NOT NULL  ,
	CONSTRAINT pk_need_group PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".need_group_need ( 
	id                   serial DEFAULT nextval('need_group_need_id_seq'::regclass) NOT NULL  ,
	id_need_details      integer  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	CONSTRAINT pk_need_group_need PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_need_need_group FOREIGN KEY ( id_need_group ) REFERENCES "public".need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_group_need_need_details FOREIGN KEY ( id_need_details ) REFERENCES "public".need_details( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".supplier ( 
	id                   integer DEFAULT nextval('supplier_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	address              varchar(100)  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	phone_number         varchar  NOT NULL  ,
	CONSTRAINT pk_supplier PRIMARY KEY ( id )
 );

CREATE  TABLE "public".account ( 
	id                   integer DEFAULT nextval('account_id_seq'::regclass) NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	"password"           varchar  NOT NULL  ,
	profil               varchar(100)  NOT NULL  ,
	id_department        integer  NOT NULL  ,
	fullname             varchar(100)    ,
	CONSTRAINT pk_account PRIMARY KEY ( id ),
	CONSTRAINT fk_account_department FOREIGN KEY ( id_department ) REFERENCES "public".department( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".article_supplier ( 
	id                   integer DEFAULT nextval('article_supplier_id_seq'::regclass) NOT NULL  ,
	status               integer  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	CONSTRAINT pk_article_supplier PRIMARY KEY ( id ),
	CONSTRAINT fk_article_supplier_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_article_supplier_supplier FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".bon_entree ( 
	id                   serial DEFAULT nextval('bon_entree_id_seq'::regclass) NOT NULL  ,
	id_magasin           integer    ,
	date_entree          date    ,
	id_supplier          integer    ,
	id_remis_par         integer    ,
	id_recu_par          integer    ,
	CONSTRAINT bon_entree_pkey PRIMARY KEY ( id ),
	CONSTRAINT bon_entree_id_supplier_fkey FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id )   ,
	CONSTRAINT bon_entree_id_recu_par_fkey FOREIGN KEY ( id_recu_par ) REFERENCES "public".account( id )   ,
	CONSTRAINT bon_entree_id_remis_par_fkey FOREIGN KEY ( id_remis_par ) REFERENCES "public".account( id )   ,
	CONSTRAINT bon_entree_id_magasin_fkey FOREIGN KEY ( id_magasin ) REFERENCES "public".magasin( id )   
 );

CREATE  TABLE "public".bon_entree_details ( 
	id                   serial DEFAULT nextval('bon_entree_details_id_seq'::regclass) NOT NULL  ,
	id_bon_entree        integer    ,
	id_article           integer    ,
	quantite             double precision    ,
	observation          varchar(200)    ,
	CONSTRAINT bon_entree_details_pkey PRIMARY KEY ( id ),
	CONSTRAINT bon_entree_details_id_article_fkey FOREIGN KEY ( id_article ) REFERENCES "public".article( id )   ,
	CONSTRAINT bon_entree_details_id_bon_entree_fkey FOREIGN KEY ( id_bon_entree ) REFERENCES "public".bon_entree( id )   
 );

CREATE  TABLE "public".bon_sortie ( 
	id                   serial DEFAULT nextval('bon_sortie_id_seq'::regclass) NOT NULL  ,
	date_sortie          date    ,
	id_demande           integer    ,
	id_remis             integer    ,
	id_magasin           integer    ,
	CONSTRAINT bon_sortie_pkey PRIMARY KEY ( id ),
	CONSTRAINT bon_sortie_id_magasin_fkey FOREIGN KEY ( id_magasin ) REFERENCES "public".magasin( id )   ,
	CONSTRAINT bon_sortie_id_remis_fkey FOREIGN KEY ( id_remis ) REFERENCES "public".account( id )   ,
	CONSTRAINT bon_sortie_id_demande_fkey FOREIGN KEY ( id_demande ) REFERENCES "public".account( id )   
 );

CREATE  TABLE "public".bon_sortie_details ( 
	id                   serial DEFAULT nextval('bon_sortie_details_id_seq'::regclass) NOT NULL  ,
	id_bon_sortie        integer    ,
	id_article           integer    ,
	quantite_demande     double precision    ,
	quantite_livre       double precision    ,
	prix_unitaire        double precision    ,
	total                double precision    ,
	CONSTRAINT bon_sortie_details_pkey PRIMARY KEY ( id ),
	CONSTRAINT bon_sortie_details_id_article_fkey FOREIGN KEY ( id_article ) REFERENCES "public".article( id )   ,
	CONSTRAINT bon_sortie_details_id_bon_sortie_fkey FOREIGN KEY ( id_bon_sortie ) REFERENCES "public".bon_sortie( id )   
 );

CREATE  TABLE "public".proforma_send ( 
	id                   integer DEFAULT nextval('proforma_send_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	numero               varchar(100)    ,
	CONSTRAINT pk_proforma_send PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_supplier FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".proforma_send_need_group ( 
	id                   integer DEFAULT nextval('proforma_send_details_id_seq'::regclass) NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_details_need_group FOREIGN KEY ( id_need_group ) REFERENCES "public".need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_send_details_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES "public".proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".purchase_order ( 
	id                   integer DEFAULT nextval('purchase_order_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	sum_ht               double precision  NOT NULL  ,
	sum_vat              double precision  NOT NULL  ,
	sum_ttc              double precision  NOT NULL  ,
	parcel_charges       double precision  NOT NULL  ,
	discount             double precision  NOT NULL  ,
	payment              integer  NOT NULL  ,
	reference            varchar  NOT NULL  ,
	CONSTRAINT pk_purchase_order PRIMARY KEY ( id ),
	CONSTRAINT fk_purchase_order_supplier FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".purchase_order_details ( 
	id                   integer DEFAULT nextval('"purchase order_details_id_seq"'::regclass) NOT NULL  ,
	id_purchase_order    integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	status               integer  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	vat                  double precision  NOT NULL  ,
	description          varchar  NOT NULL  ,
	CONSTRAINT fk_purchase_order_details_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_purchase_order_details_purchase_order FOREIGN KEY ( id_purchase_order ) REFERENCES "public".purchase_order( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".proforma ( 
	id                   integer DEFAULT nextval('proformat_id_seq'::regclass) NOT NULL  ,
	date_received        date  NOT NULL  ,
	total_ht             double precision    ,
	id_proforma_send     integer  NOT NULL  ,
	total_tva            double precision    ,
	total_ttc            double precision    ,
	numero               varchar(100)    ,
	CONSTRAINT pk_proformat PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES "public".proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".proforma_details ( 
	id                   integer DEFAULT nextval('proformat_details_id_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	tva                  double precision  NOT NULL  ,
	unit_price           double precision  NOT NULL  ,
	total_ht             double precision  NOT NULL  ,
	id_proforma          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	id_need_group        integer    ,
	CONSTRAINT pk_proformat_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_details_need_group FOREIGN KEY ( id_need_group ) REFERENCES "public".need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_proforma FOREIGN KEY ( id_proforma ) REFERENCES "public".proforma( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE OR REPLACE VIEW "public".moins_disant AS SELECT ng.numero AS need_numero,     a.name AS article_name,     pd.quantity,     pd.unit_price,     pd.tva,     pd.total_ht,     s.name AS supplier_name,     p.numero AS proforma_numero,     p.date_received    FROM (((((need_group ng      JOIN proforma_details pd ON ((ng.id = pd.id_need_group)))      JOIN article a ON ((a.id = pd.id_article)))      JOIN proforma p ON ((p.id = pd.id_proforma)))      JOIN proforma_send ps ON ((ps.id = p.id_proforma_send)))      JOIN supplier s ON ((s.id = ps.id_supplier)))   WHERE ((ng.id, pd.unit_price) IN ( SELECT proforma_details.id_need_group,             min(proforma_details.unit_price) AS min            FROM proforma_details           GROUP BY proforma_details.id_need_group))
 SELECT ng.numero AS need_numero,
    a.name AS article_name,
    pd.quantity,
    pd.unit_price,
    pd.tva,
    pd.total_ht,
    s.name AS supplier_name,
    p.numero AS proforma_numero,
    p.date_received
   FROM (((((need_group ng
     JOIN proforma_details pd ON ((ng.id = pd.id_need_group)))
     JOIN article a ON ((a.id = pd.id_article)))
     JOIN proforma p ON ((p.id = pd.id_proforma)))
     JOIN proforma_send ps ON ((ps.id = p.id_proforma_send)))
     JOIN supplier s ON ((s.id = ps.id_supplier)))
  WHERE ((ng.id, pd.unit_price) IN ( SELECT proforma_details.id_need_group,
            min(proforma_details.unit_price) AS min
           FROM proforma_details
          GROUP BY proforma_details.id_need_group));

CREATE OR REPLACE VIEW "public".v_account AS SELECT a.id,     a.email,     a.password,     a.profil,     a.id_department,     a.fullname,     d.name AS department_name    FROM (account a      JOIN department d ON ((d.id = a.id_department)))
 SELECT a.id,
    a.email,
    a.password,
    a.profil,
    a.id_department,
    a.fullname,
    d.name AS department_name
   FROM (account a
     JOIN department d ON ((d.id = a.id_department)));

CREATE OR REPLACE VIEW "public".v_article_email AS SELECT ps.id,     ng.quantity,     a.name,     a.unit    FROM (((proforma_send ps      JOIN proforma_send_need_group psng ON ((ps.id = psng.id_proforma_send)))      JOIN need_group ng ON ((ng.id = psng.id_need_group)))      JOIN article a ON ((a.id = ng.id_article)))
 SELECT ps.id,
    ng.quantity,
    a.name,
    a.unit
   FROM (((proforma_send ps
     JOIN proforma_send_need_group psng ON ((ps.id = psng.id_proforma_send)))
     JOIN need_group ng ON ((ng.id = psng.id_need_group)))
     JOIN article a ON ((a.id = ng.id_article)));

CREATE OR REPLACE VIEW "public".v_besoin AS SELECT de.name AS department,     a.name AS article,     n.quantity,     d.date_send,     n.date_need,     n.id_department_needs,     n.id AS id_need_details,     d.validation,     a.id AS id_article    FROM (((need_details n      JOIN department_needs d ON ((d.id = n.id_department_needs)))      JOIN department de ON ((de.id = d.id_department)))      JOIN article a ON ((a.id = n.id_article)))
 SELECT de.name AS department,
    a.name AS article,
    n.quantity,
    d.date_send,
    n.date_need,
    n.id_department_needs,
    n.id AS id_need_details,
    d.validation,
    a.id AS id_article
   FROM (((need_details n
     JOIN department_needs d ON ((d.id = n.id_department_needs)))
     JOIN department de ON ((de.id = d.id_department)))
     JOIN article a ON ((a.id = n.id_article)));

CREATE OR REPLACE VIEW "public".v_besoin_a_afficher AS SELECT v.department,     v.article,     v.quantity,     v.date_send,     v.date_need,     v.id_department_needs,     v.id_need_details,     v.validation,     v.id_article    FROM (v_besoin v      JOIN need_group_need n ON ((n.id_need_details = v.id_need_details)))   WHERE (NOT (n.id_need_group IN ( SELECT proforma_send_need_group.id_need_group            FROM proforma_send_need_group)))
 SELECT v.department,
    v.article,
    v.quantity,
    v.date_send,
    v.date_need,
    v.id_department_needs,
    v.id_need_details,
    v.validation,
    v.id_article
   FROM (v_besoin v
     JOIN need_group_need n ON ((n.id_need_details = v.id_need_details)))
  WHERE (NOT (n.id_need_group IN ( SELECT proforma_send_need_group.id_need_group
           FROM proforma_send_need_group)));

CREATE OR REPLACE VIEW "public".v_besoin_a_grouper AS SELECT v_besoin.department,     v_besoin.article,     v_besoin.quantity,     v_besoin.date_send,     v_besoin.date_need,     v_besoin.id_department_needs,     v_besoin.id_need_details,     v_besoin.validation,     v_besoin.id_article    FROM v_besoin   WHERE ((v_besoin.validation = 1) AND (NOT (v_besoin.id_need_details IN ( SELECT need_group_need.id_need_details            FROM need_group_need))))
 SELECT v_besoin.department,
    v_besoin.article,
    v_besoin.quantity,
    v_besoin.date_send,
    v_besoin.date_need,
    v_besoin.id_department_needs,
    v_besoin.id_need_details,
    v_besoin.validation,
    v_besoin.id_article
   FROM v_besoin
  WHERE ((v_besoin.validation = 1) AND (NOT (v_besoin.id_need_details IN ( SELECT need_group_need.id_need_details
           FROM need_group_need))));

CREATE OR REPLACE VIEW "public".v_bon_entree AS SELECT be.id,     be.id_magasin,     be.date_entree,     be.id_supplier,     be.id_remis_par,     be.id_recu_par,     m.name AS magasin_name,     s.name AS supplier_name,     a1.fullname AS remis_par_name,     a2.fullname AS recu_par_name    FROM ((((bon_entree be      JOIN magasin m ON ((m.id = be.id_magasin)))      JOIN supplier s ON ((s.id = be.id_supplier)))      JOIN account a1 ON ((a1.id = be.id_remis_par)))      JOIN account a2 ON ((a2.id = be.id_recu_par)))
 SELECT be.id,
    be.id_magasin,
    be.date_entree,
    be.id_supplier,
    be.id_remis_par,
    be.id_recu_par,
    m.name AS magasin_name,
    s.name AS supplier_name,
    a1.fullname AS remis_par_name,
    a2.fullname AS recu_par_name
   FROM ((((bon_entree be
     JOIN magasin m ON ((m.id = be.id_magasin)))
     JOIN supplier s ON ((s.id = be.id_supplier)))
     JOIN account a1 ON ((a1.id = be.id_remis_par)))
     JOIN account a2 ON ((a2.id = be.id_recu_par)));

CREATE OR REPLACE VIEW "public".v_bon_entree_details AS SELECT bed.id,     bed.id_bon_entree,     bed.id_article,     bed.quantite,     bed.observation,     a.name AS article_name    FROM (bon_entree_details bed      JOIN article a ON ((a.id = bed.id_article)))
 SELECT bed.id,
    bed.id_bon_entree,
    bed.id_article,
    bed.quantite,
    bed.observation,
    a.name AS article_name
   FROM (bon_entree_details bed
     JOIN article a ON ((a.id = bed.id_article)));

CREATE OR REPLACE VIEW "public".v_bon_sortie AS SELECT bs.id,     bs.date_sortie,     bs.id_demande,     bs.id_remis,     bs.id_magasin,     a1.fullname AS demande_name,     a2.fullname AS remis_name,     m.name AS magasin_name    FROM (((bon_sortie bs      JOIN account a1 ON ((a1.id = bs.id_demande)))      JOIN account a2 ON ((a2.id = bs.id_remis)))      JOIN magasin m ON ((m.id = bs.id_magasin)))
 SELECT bs.id,
    bs.date_sortie,
    bs.id_demande,
    bs.id_remis,
    bs.id_magasin,
    a1.fullname AS demande_name,
    a2.fullname AS remis_name,
    m.name AS magasin_name
   FROM (((bon_sortie bs
     JOIN account a1 ON ((a1.id = bs.id_demande)))
     JOIN account a2 ON ((a2.id = bs.id_remis)))
     JOIN magasin m ON ((m.id = bs.id_magasin)));

CREATE OR REPLACE VIEW "public".v_bon_sortie_detials AS SELECT bsd.id,     bsd.id_bon_sortie,     bsd.id_article,     bsd.quantite_demande,     bsd.quantite_livre,     bsd.prix_unitaire,     bsd.total,     a.name AS article_name    FROM (bon_sortie_details bsd      JOIN article a ON ((a.id = bsd.id_article)))
 SELECT bsd.id,
    bsd.id_bon_sortie,
    bsd.id_article,
    bsd.quantite_demande,
    bsd.quantite_livre,
    bsd.prix_unitaire,
    bsd.total,
    a.name AS article_name
   FROM (bon_sortie_details bsd
     JOIN article a ON ((a.id = bsd.id_article)));

CREATE OR REPLACE VIEW "public".v_group_non_proformer AS SELECT n.id,     n.numero,     n.id_article,     n.quantity,     n.final_date_need,     a.name AS article    FROM (need_group n      JOIN article a ON ((a.id = n.id_article)))   WHERE (NOT (n.id IN ( SELECT proforma_send_need_group.id_need_group            FROM proforma_send_need_group)))
 SELECT n.id,
    n.numero,
    n.id_article,
    n.quantity,
    n.final_date_need,
    a.name AS article
   FROM (need_group n
     JOIN article a ON ((a.id = n.id_article)))
  WHERE (NOT (n.id IN ( SELECT proforma_send_need_group.id_need_group
           FROM proforma_send_need_group)));

CREATE OR REPLACE VIEW "public".v_group_proformer AS SELECT n.id,     n.numero,     n.id_article,     n.quantity,     n.final_date_need,     a.name AS article    FROM (need_group n      JOIN article a ON ((a.id = n.id_article)))   WHERE (n.id IN ( SELECT proforma_send_need_group.id_need_group            FROM proforma_send_need_group))
 SELECT n.id,
    n.numero,
    n.id_article,
    n.quantity,
    n.final_date_need,
    a.name AS article
   FROM (need_group n
     JOIN article a ON ((a.id = n.id_article)))
  WHERE (n.id IN ( SELECT proforma_send_need_group.id_need_group
           FROM proforma_send_need_group));

CREATE OR REPLACE VIEW "public".v_group_proformer_details AS SELECT psng.id_need_group AS id,     ps.id_supplier,     s.name AS supplier,     ps.date_send,     ps.numero    FROM ((proforma_send ps      JOIN supplier s ON ((s.id = ps.id_supplier)))      JOIN proforma_send_need_group psng ON ((psng.id_proforma_send = ps.id)))
 SELECT psng.id_need_group AS id,
    ps.id_supplier,
    s.name AS supplier,
    ps.date_send,
    ps.numero
   FROM ((proforma_send ps
     JOIN supplier s ON ((s.id = ps.id_supplier)))
     JOIN proforma_send_need_group psng ON ((psng.id_proforma_send = ps.id)));

CREATE OR REPLACE VIEW "public".v_proforma AS SELECT p.id,     p.date_received,     p.total_ht,     p.id_proforma_send,     p.total_tva,     p.total_ttc,     p.numero,     ps.date_send,     ps.numero AS numero_send,     s.name AS supplier    FROM ((proforma p      JOIN proforma_send ps ON ((ps.id = p.id_proforma_send)))      JOIN supplier s ON ((s.id = ps.id_supplier)))
 SELECT p.id,
    p.date_received,
    p.total_ht,
    p.id_proforma_send,
    p.total_tva,
    p.total_ttc,
    p.numero,
    ps.date_send,
    ps.numero AS numero_send,
    s.name AS supplier
   FROM ((proforma p
     JOIN proforma_send ps ON ((ps.id = p.id_proforma_send)))
     JOIN supplier s ON ((s.id = ps.id_supplier)));

CREATE OR REPLACE VIEW "public".v_proforma_details AS SELECT pd.id,     pd.quantity,     pd.tva,     pd.unit_price,     pd.total_ht,     pd.id_proforma,     pd.id_article,     pd.id_need_group,     a.name AS article_name,     a.unit,     ng.numero    FROM ((proforma_details pd      JOIN article a ON ((a.id = pd.id_article)))      JOIN need_group ng ON ((ng.id = pd.id_need_group)))
 SELECT pd.id,
    pd.quantity,
    pd.tva,
    pd.unit_price,
    pd.total_ht,
    pd.id_proforma,
    pd.id_article,
    pd.id_need_group,
    a.name AS article_name,
    a.unit,
    ng.numero
   FROM ((proforma_details pd
     JOIN article a ON ((a.id = pd.id_article)))
     JOIN need_group ng ON ((ng.id = pd.id_need_group)));

CREATE OR REPLACE VIEW "public".v_proforma_send AS SELECT ps.id,     ps.date_send,     ps.id_supplier,     ps.numero,     s.name,     s.address,     s.email,     s.phone_number    FROM (proforma_send ps      JOIN supplier s ON ((s.id = ps.id_supplier)))   WHERE (NOT (ps.id IN ( SELECT proforma.id_proforma_send            FROM proforma)))
 SELECT ps.id,
    ps.date_send,
    ps.id_supplier,
    ps.numero,
    s.name,
    s.address,
    s.email,
    s.phone_number
   FROM (proforma_send ps
     JOIN supplier s ON ((s.id = ps.id_supplier)))
  WHERE (NOT (ps.id IN ( SELECT proforma.id_proforma_send
           FROM proforma)));

CREATE OR REPLACE VIEW "public".v_proforma_send_need_group AS SELECT psng.id,     psng.id_proforma_send,     psng.id_need_group,     ng.numero,     ng.id_article,     ng.quantity,     ng.final_date_need,     a.name AS article_name,     a.unit AS article_unit    FROM ((proforma_send_need_group psng      JOIN need_group ng ON ((ng.id = psng.id_need_group)))      JOIN article a ON ((a.id = ng.id_article)))
 SELECT psng.id,
    psng.id_proforma_send,
    psng.id_need_group,
    ng.numero,
    ng.id_article,
    ng.quantity,
    ng.final_date_need,
    a.name AS article_name,
    a.unit AS article_unit
   FROM ((proforma_send_need_group psng
     JOIN need_group ng ON ((ng.id = psng.id_need_group)))
     JOIN article a ON ((a.id = ng.id_article)));

INSERT INTO "public".article( id, name, unit ) VALUES ( 1, 'Charbon', 'kg');
INSERT INTO "public".article( id, name, unit ) VALUES ( 2, 'Composte', 'm3');
INSERT INTO "public".article( id, name, unit ) VALUES ( 3, 'Beton Plastique', 'm3');
INSERT INTO "public".company( id, name, address, tel, email ) VALUES ( 1, 'CLFournisseur', 'Lot III AB 50', '0323245671', 'clf@gmail.com');
INSERT INTO "public".department( id, name ) VALUES ( 1, 'Sales');
INSERT INTO "public".department( id, name ) VALUES ( 2, 'Marketing');
INSERT INTO "public".department( id, name ) VALUES ( 3, 'Finance');
INSERT INTO "public".magasin( id, name ) VALUES ( 1, 'Magasin1');
INSERT INTO "public".magasin( id, name ) VALUES ( 2, 'Magasin2');
INSERT INTO "public".magasin( id, name ) VALUES ( 3, 'Magasin3');
INSERT INTO "public".need_group( id, numero, id_article, quantity, final_date_need ) VALUES ( 14, 'NG2', 2, 20.0, '2023-11-26');
INSERT INTO "public".need_group( id, numero, id_article, quantity, final_date_need ) VALUES ( 15, 'NG5', 3, 7.0, '2023-11-29');
INSERT INTO "public".need_group( id, numero, id_article, quantity, final_date_need ) VALUES ( 13, 'NG1', 1, 38.0, '2023-11-25');
INSERT INTO "public".supplier( id, name, address, email, phone_number ) VALUES ( 1, 'CHIMIC', 'Lot D1 F Antananarivo', 'kelydoda724@gmail.com', '+261 32 24 567 45');
INSERT INTO "public".supplier( id, name, address, email, phone_number ) VALUES ( 2, 'ZAFI ALA', 'Lot H F Ambato', 'kelydoda724@gmail.com', '+261 32 23 245 67');
INSERT INTO "public".supplier( id, name, address, email, phone_number ) VALUES ( 3, 'GASY Tontolo', 'Lot H F Fenerive-Est', 'kelydoda724@gmail.com', '+261 32 23 245 67');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 10, 'john@example.com', 'pass123', 'admin', 1, 'John Doe');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 11, 'jane@example.com', 'pass456', 'manager', 1, 'Jane Smith');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 12, 'alice@example.com', 'pass789', 'employee', 1, 'Alice Johnson');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 13, 'robert@example.com', 'pass123', 'admin', 2, 'Robert Brown');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 14, 'emily@example.com', 'pass456', 'manager', 2, 'Emily Davis');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 15, 'michael@example.com', 'pass789', 'employee', 2, 'Michael Clark');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 16, 'sarah@example.com', 'pass123', 'admin', 3, 'Sarah Wilson');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 17, 'david@example.com', 'pass456', 'manager', 3, 'David Garcia');
INSERT INTO "public".account( id, email, "password", profil, id_department, fullname ) VALUES ( 18, 'olivia@example.com', 'pass789', 'employee', 3, 'Olivia Martinez');
INSERT INTO "public".bon_entree( id, id_magasin, date_entree, id_supplier, id_remis_par, id_recu_par ) VALUES ( 1, 1, '2021-01-01', 1, 12, 11);
INSERT INTO "public".bon_entree( id, id_magasin, date_entree, id_supplier, id_remis_par, id_recu_par ) VALUES ( 2, 3, '2023-12-30', 2, 11, 12);
INSERT INTO "public".bon_entree( id, id_magasin, date_entree, id_supplier, id_remis_par, id_recu_par ) VALUES ( 3, 2, '2023-01-01', 2, 12, 11);
INSERT INTO "public".bon_entree_details( id, id_bon_entree, id_article, quantite, observation ) VALUES ( 1, 1, 1, 10.0, 'bla');
INSERT INTO "public".bon_entree_details( id, id_bon_entree, id_article, quantite, observation ) VALUES ( 2, 1, 2, 10.0, 'bla');
INSERT INTO "public".bon_entree_details( id, id_bon_entree, id_article, quantite, observation ) VALUES ( 3, 2, 1, 10.0, 'bla');
INSERT INTO "public".bon_entree_details( id, id_bon_entree, id_article, quantite, observation ) VALUES ( 4, 3, 2, 10.0, 'bla');
INSERT INTO "public".bon_sortie( id, date_sortie, id_demande, id_remis, id_magasin ) VALUES ( 2, '2023-01-01', 12, 11, 1);
INSERT INTO "public".bon_sortie( id, date_sortie, id_demande, id_remis, id_magasin ) VALUES ( 3, '2023-01-01', 12, 11, 2);
INSERT INTO "public".bon_sortie_details( id, id_bon_sortie, id_article, quantite_demande, quantite_livre, prix_unitaire, total ) VALUES ( 1, 2, 2, 10.0, 5.0, 100.0, 500.0);
INSERT INTO "public".bon_sortie_details( id, id_bon_sortie, id_article, quantite_demande, quantite_livre, prix_unitaire, total ) VALUES ( 2, 2, 1, 5.0, 2.0, 100.0, 200.0);
INSERT INTO "public".bon_sortie_details( id, id_bon_sortie, id_article, quantite_demande, quantite_livre, prix_unitaire, total ) VALUES ( 3, 3, 2, 100.0, 10.0, 100.0, 1000.0);
INSERT INTO "public".bon_sortie_details( id, id_bon_sortie, id_article, quantite_demande, quantite_livre, prix_unitaire, total ) VALUES ( 4, 3, 1, 100.0, 10.0, 100.0, 1000.0);
INSERT INTO "public".proforma_send( id, date_send, id_supplier, numero ) VALUES ( 2, '2023-11-10', 2, 'ENV2');
INSERT INTO "public".proforma_send( id, date_send, id_supplier, numero ) VALUES ( 4, '2023-11-11', 3, 'ENV4');
INSERT INTO "public".proforma_send( id, date_send, id_supplier, numero ) VALUES ( 5, '2023-11-10', 3, 'ENV5');
INSERT INTO "public".proforma_send( id, date_send, id_supplier, numero ) VALUES ( 6, '2023-11-10', 3, 'ENV6');
INSERT INTO "public".proforma_send( id, date_send, id_supplier, numero ) VALUES ( 7, '2023-11-10', 3, 'ENV7');
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 1, 2, 13);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 2, 2, 14);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 3, 4, 13);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 4, 5, 14);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 5, 6, 13);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 6, 6, 14);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 7, 7, 13);
INSERT INTO "public".proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 8, 7, 14);
INSERT INTO "public".purchase_order( id, date_send, validation, id_supplier, sum_ht, sum_vat, sum_ttc, parcel_charges, discount, payment, reference ) VALUES ( 7, '2023-01-01', 0, 2, 1000.0, 200000.0, 1200.0, 50000.0, 0.0, 10, '');
INSERT INTO "public".purchase_order( id, date_send, validation, id_supplier, sum_ht, sum_vat, sum_ttc, parcel_charges, discount, payment, reference ) VALUES ( 8, '2023-01-01', 0, 3, 10000.0, 2000.0, 12000.0, 50000.0, 0.0, 10, 'RE2023-01-01-30-2');
INSERT INTO "public".purchase_order_details( id, id_purchase_order, id_article, quantity, date_need, status, sale_price, vat, description ) VALUES ( 6, 7, 2, 100.0, '2023-01-01', 0, 10000.0, 20.0, 'desc');
INSERT INTO "public".purchase_order_details( id, id_purchase_order, id_article, quantity, date_need, status, sale_price, vat, description ) VALUES ( 7, 8, 1, 1000.0, '2023-01-01', 0, 10000.0, 20.0, 'desc');
INSERT INTO "public".proforma( id, date_received, total_ht, id_proforma_send, total_tva, total_ttc, numero ) VALUES ( 9, '2023-10-10', 580.0, 2, 0.0, 580.0, 'PRF9');
INSERT INTO "public".proforma( id, date_received, total_ht, id_proforma_send, total_tva, total_ttc, numero ) VALUES ( 10, '2023-11-20', 3800.0, 4, 0.0, 3800.0, 'PRF10');
INSERT INTO "public".proforma_details( id, quantity, tva, unit_price, total_ht, id_proforma, id_article, id_need_group ) VALUES ( 12, 20.0, 0.0, 10.0, 200.0, 9, 2, 14);
INSERT INTO "public".proforma_details( id, quantity, tva, unit_price, total_ht, id_proforma, id_article, id_need_group ) VALUES ( 13, 38.0, 0.0, 10.0, 380.0, 9, 1, 13);
INSERT INTO "public".proforma_details( id, quantity, tva, unit_price, total_ht, id_proforma, id_article, id_need_group ) VALUES ( 14, 38.0, 0.0, 100.0, 3800.0, 10, 1, 13);
