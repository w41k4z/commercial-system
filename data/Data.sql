CREATE USER commercial login PASSWORD 'commercial';
CREATE DATABASE commercial_system WITH OWNER commercial;

CREATE SEQUENCE "public".account_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".article_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".article_supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".department_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".department_needs_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_id_article_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_need_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_group_proforma_send_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proforma_send_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proforma_send_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proformat_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proformat_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".purchase_order_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".purchase_order_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE  TABLE "public".article ( 
	id                   integer DEFAULT nextval('article_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	unit                 varchar  NOT NULL  ,
	CONSTRAINT pk_article PRIMARY KEY ( id )
 );

CREATE  TABLE "public".company ( 
	id                   serial  NOT NULL  ,
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
	id                   integer DEFAULT nextval('need_group_id_seq'::regclass) NOT NULL  ,
	numero               varchar(100)  NOT NULL  ,
	id_article           integer DEFAULT nextval('need_group_id_article_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	final_date_need      date  NOT NULL  ,
	CONSTRAINT pk_need_group PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".need_group_need ( 
	id                   integer DEFAULT nextval('need_group_need_id_seq'::regclass) NOT NULL  ,
	id_need_details      integer  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	CONSTRAINT pk_need_group_need PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_need_need_details FOREIGN KEY ( id_need_details ) REFERENCES "public".need_details( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_group_need_need_group FOREIGN KEY ( id_need_group ) REFERENCES "public".need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE 
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
	profil               integer  NOT NULL  ,
	id_department        integer  NOT NULL  ,
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

CREATE  TABLE "public".proforma_send ( 
	id                   integer DEFAULT nextval('proforma_send_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_supplier FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".proforma_send_details ( 
	id                   integer DEFAULT nextval('proforma_send_details_id_seq'::regclass) NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send_details PRIMARY KEY ( id ),
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
	id                   integer DEFAULT nextval('purchase_order_details_id_seq'::regclass) NOT NULL  ,
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

CREATE  TABLE "public".need_group_proforma_send ( 
	id                   integer DEFAULT nextval('need_group_proforma_send_id_seq'::regclass) NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_group_need_proforma PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_proforma_need_group FOREIGN KEY ( id_need_group ) REFERENCES "public".need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_group_proforma_send_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES "public".proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".proforma ( 
	id                   integer DEFAULT nextval('proformat_id_seq'::regclass) NOT NULL  ,
	date_received        date  NOT NULL  ,
	total_price          double precision    ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_proformat PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES "public".proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".proforma_details ( 
	id                   integer DEFAULT nextval('proformat_details_id_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	tva                  double precision  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	total_price          double precision  NOT NULL  ,
	id_proforma          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	CONSTRAINT pk_proformat_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_details_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_proforma FOREIGN KEY ( id_proforma ) REFERENCES "public".proforma( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE VIEW "public".v_besoin AS  SELECT de.name AS department,
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

CREATE VIEW "public".v_besoin_a_grouper AS  SELECT v_besoin.department,
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

CREATE VIEW "public".v_group_non_proformer AS  SELECT need_group.id,
    need_group.numero,
    need_group.id_article,
    need_group.quantity,
    need_group.final_date_need
   FROM need_group
  WHERE (NOT (need_group.id IN ( SELECT need_group_proforma_send.id_need_group
           FROM need_group_proforma_send)));

