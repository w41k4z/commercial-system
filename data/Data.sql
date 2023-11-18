CREATE USER commercial superuser login PASSWORD 'commercial';
CREATE DATABASE commercial_system WITH OWNER commercial;
CREATE SEQUENCE "public".account_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".article_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".article_supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".department_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".department_needs_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".need_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proforma_send_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proforma_send_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proformat_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".proformat_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public"."purchase order_details_id_seq" START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".purchase_order_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "public".supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE  TABLE "public".department ( 
	id                   integer DEFAULT nextval('department_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	CONSTRAINT pk_department PRIMARY KEY ( id )
 );

CREATE  TABLE "public".department_needs ( 
	id                   integer DEFAULT nextval('department_needs_id_seq'::regclass) NOT NULL  ,
	id_department        integer  NOT NULL  ,
	date_send            date  NOT NULL  ,
	date_need            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	CONSTRAINT pk_needs PRIMARY KEY ( id ),
	CONSTRAINT unq_department_needs_id_department UNIQUE ( id_department ) ,
	CONSTRAINT fk_department_needs_department FOREIGN KEY ( id_department ) REFERENCES "public".department( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".need_details ( 
	id                   integer DEFAULT nextval('need_details_id_seq'::regclass) NOT NULL  ,
	id_department_needs  integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	motif                varchar  NOT NULL  ,
	CONSTRAINT pk_need_details PRIMARY KEY ( id ),
	CONSTRAINT unq_need_details_id_article UNIQUE ( id_article ) ,
	CONSTRAINT unq_need_details_id_department_needs UNIQUE ( id_department_needs ) ,
	CONSTRAINT fk_need_details_department_needs FOREIGN KEY ( id_department_needs ) REFERENCES "public".department_needs( id ) ON DELETE CASCADE ON UPDATE CASCADE 
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

CREATE  TABLE "public".article ( 
	id                   integer DEFAULT nextval('article_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	unit                 varchar  NOT NULL  ,
	CONSTRAINT pk_article PRIMARY KEY ( id ),
	CONSTRAINT fk_article_need_details FOREIGN KEY ( id ) REFERENCES "public".need_details( id_article ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public".article_supplier ( 
	id                   integer DEFAULT nextval('article_supplier_id_seq'::regclass) NOT NULL  ,
	id_article           integer  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	status               integer  NOT NULL  ,
	CONSTRAINT pk_article_supplier PRIMARY KEY ( id ),
	CONSTRAINT unq_article_supplier_id_article UNIQUE ( id_article ) ,
	CONSTRAINT unq_article_supplier_id_supplier UNIQUE ( id_supplier ) ,
	CONSTRAINT fk_article_supplier_supplier FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_article_supplier_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
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
	CONSTRAINT pk_purchase_order PRIMARY KEY ( id ),
	CONSTRAINT fk_purchase_order_supplier FOREIGN KEY ( id_supplier ) REFERENCES "public".supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
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
	id_proforma          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	tva                  double precision  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	total_price          double precision  NOT NULL  ,
	CONSTRAINT pk_proformat_details PRIMARY KEY ( id ),
	CONSTRAINT unq_proforma_details_id_proforma UNIQUE ( id_proforma ) ,
	CONSTRAINT unq_proforma_details_id_article UNIQUE ( id_article ) ,
	CONSTRAINT fk_proforma_details_proforma FOREIGN KEY ( id_proforma ) REFERENCES "public".proforma( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_article FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "public"."purchase order_details" ( 
	id                   integer DEFAULT nextval('"purchase order_details_id_seq"'::regclass) NOT NULL  ,
	"id_purchase order"  integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	status               integer  NOT NULL  ,
	CONSTRAINT "pk_purchase order_details" PRIMARY KEY ( id ),
	CONSTRAINT "unq_purchase order_details_id_article" UNIQUE ( id_article ) ,
	CONSTRAINT "fk_purchase order_details_purchase_order" FOREIGN KEY ( "id_purchase order" ) REFERENCES "public".purchase_order( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT "fk_purchase order_details_article" FOREIGN KEY ( id_article ) REFERENCES "public".article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );