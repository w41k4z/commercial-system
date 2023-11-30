CREATE SCHEMA IF NOT EXISTS "public";

CREATE SEQUENCE account_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE article_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE article_supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE company_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE department_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE department_needs_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE need_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE need_group_id_article_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE need_group_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE need_group_need_id_seq AS integer START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE proforma_send_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE proforma_send_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE proformat_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE proformat_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE purchase order_details_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE "purchase order_details_id_seq" START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE purchase_order_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE  TABLE article ( 
	id                   integer DEFAULT nextval('article_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	unit                 varchar  NOT NULL  ,
	CONSTRAINT pk_article PRIMARY KEY ( id )
 );

CREATE  TABLE company ( 
	id                   serial DEFAULT nextval('company_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	address              varchar(100)  NOT NULL  ,
	tel                  varchar  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	CONSTRAINT pk_company PRIMARY KEY ( id )
 );

CREATE  TABLE department ( 
	id                   integer DEFAULT nextval('department_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	CONSTRAINT pk_department PRIMARY KEY ( id )
 );

CREATE  TABLE department_needs ( 
	id                   integer DEFAULT nextval('department_needs_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	id_department        integer  NOT NULL  ,
	CONSTRAINT pk_needs PRIMARY KEY ( id ),
	CONSTRAINT fk_department_needs_department FOREIGN KEY ( id_department ) REFERENCES department( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE need_details ( 
	id                   integer DEFAULT nextval('need_details_id_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	motif                varchar  NOT NULL  ,
	date_need            date  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	id_department_needs  integer  NOT NULL  ,
	CONSTRAINT pk_need_details PRIMARY KEY ( id ),
	CONSTRAINT fk_need_details_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_details_department_needs FOREIGN KEY ( id_department_needs ) REFERENCES department_needs( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE need_group ( 
	id                   serial DEFAULT nextval('need_group_id_seq'::regclass) NOT NULL  ,
	numero               varchar(100)  NOT NULL  ,
	id_article           serial DEFAULT nextval('need_group_id_article_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	final_date_need      date  NOT NULL  ,
	CONSTRAINT pk_need_group PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE need_group_need ( 
	id                   serial DEFAULT nextval('need_group_need_id_seq'::regclass) NOT NULL  ,
	id_need_details      integer  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	CONSTRAINT pk_need_group_need PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_need_need_group FOREIGN KEY ( id_need_group ) REFERENCES need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_group_need_need_details FOREIGN KEY ( id_need_details ) REFERENCES need_details( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE purchase_order_details ( 
	id                   integer DEFAULT nextval('"purchase order_details_id_seq"'::regclass) NOT NULL  ,
	id_purchase_order    integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	status               integer  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	vat                  double precision  NOT NULL  ,
	description          varchar  NOT NULL  ,
	CONSTRAINT "fk_purchase order_details_article" FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE supplier ( 
	id                   integer DEFAULT nextval('supplier_id_seq'::regclass) NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	address              varchar(100)  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	phone_number         varchar  NOT NULL  ,
	CONSTRAINT pk_supplier PRIMARY KEY ( id )
 );

CREATE  TABLE account ( 
	id                   integer DEFAULT nextval('account_id_seq'::regclass) NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	"password"           varchar  NOT NULL  ,
	profil               integer  NOT NULL  ,
	id_department        integer  NOT NULL  ,
	CONSTRAINT pk_account PRIMARY KEY ( id ),
	CONSTRAINT fk_account_department FOREIGN KEY ( id_department ) REFERENCES department( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE article_supplier ( 
	id                   integer DEFAULT nextval('article_supplier_id_seq'::regclass) NOT NULL  ,
	status               integer  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	CONSTRAINT pk_article_supplier PRIMARY KEY ( id ),
	CONSTRAINT fk_article_supplier_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_article_supplier_supplier FOREIGN KEY ( id_supplier ) REFERENCES supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma_send ( 
	id                   integer DEFAULT nextval('proforma_send_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	numero               varchar(100)    ,
	CONSTRAINT pk_proforma_send PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_supplier FOREIGN KEY ( id_supplier ) REFERENCES supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma_send_need_group ( 
	id                   integer DEFAULT nextval('proforma_send_details_id_seq'::regclass) NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_details_need_group FOREIGN KEY ( id_need_group ) REFERENCES need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_send_details_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE purchase_order ( 
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
	CONSTRAINT fk_purchase_order_supplier FOREIGN KEY ( id_supplier ) REFERENCES supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma ( 
	id                   integer DEFAULT nextval('proformat_id_seq'::regclass) NOT NULL  ,
	date_received        date  NOT NULL  ,
	total_ht             double precision    ,
	id_proforma_send     integer  NOT NULL  ,
	total_tva            double precision    ,
	total_ttc            double precision    ,
	numero               varchar(100)    ,
	CONSTRAINT pk_proformat PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma_details ( 
	id                   integer DEFAULT nextval('proformat_details_id_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	tva                  double precision  NOT NULL  ,
	unit_price           double precision  NOT NULL  ,
	total_ht             double precision  NOT NULL  ,
	id_proforma          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	id_need_group        integer    ,
	CONSTRAINT pk_proformat_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_details_need_group FOREIGN KEY ( id_need_group ) REFERENCES need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_proforma FOREIGN KEY ( id_proforma ) REFERENCES proforma( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE OR REPLACE VIEW moins_disant AS SELECT ng.numero AS need_numero,     a.name AS article_name,     pd.quantity,     pd.unit_price,     pd.tva,     pd.total_ht,     s.name AS supplier_name,     p.numero AS proforma_numero,     p.date_received    FROM (((((need_group ng      JOIN proforma_details pd ON ((ng.id = pd.id_need_group)))      JOIN article a ON ((a.id = pd.id_article)))      JOIN proforma p ON ((p.id = pd.id_proforma)))      JOIN proforma_send ps ON ((ps.id = p.id_proforma_send)))      JOIN supplier s ON ((s.id = ps.id_supplier)))   WHERE ((ng.id, pd.unit_price) IN ( SELECT proforma_details.id_need_group,             min(proforma_details.unit_price) AS min            FROM proforma_details           GROUP BY proforma_details.id_need_group))
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

CREATE OR REPLACE VIEW v_article_email AS SELECT ps.id,     ng.quantity,     a.name,     a.unit    FROM (((proforma_send ps      JOIN proforma_send_need_group psng ON ((ps.id = psng.id_proforma_send)))      JOIN need_group ng ON ((ng.id = psng.id_need_group)))      JOIN article a ON ((a.id = ng.id_article)))
 SELECT ps.id,
    ng.quantity,
    a.name,
    a.unit
   FROM (((proforma_send ps
     JOIN proforma_send_need_group psng ON ((ps.id = psng.id_proforma_send)))
     JOIN need_group ng ON ((ng.id = psng.id_need_group)))
     JOIN article a ON ((a.id = ng.id_article)));

CREATE OR REPLACE VIEW v_besoin AS SELECT de.name AS department,     a.name AS article,     n.quantity,     d.date_send,     n.date_need,     n.id_department_needs,     n.id AS id_need_details,     d.validation,     a.id AS id_article    FROM (((need_details n      JOIN department_needs d ON ((d.id = n.id_department_needs)))      JOIN department de ON ((de.id = d.id_department)))      JOIN article a ON ((a.id = n.id_article)))
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

CREATE OR REPLACE VIEW v_besoin_a_afficher AS SELECT v.department,     v.article,     v.quantity,     v.date_send,     v.date_need,     v.id_department_needs,     v.id_need_details,     v.validation,     v.id_article    FROM (v_besoin v      JOIN need_group_need n ON ((n.id_need_details = v.id_need_details)))   WHERE (NOT (n.id_need_group IN ( SELECT proforma_send_need_group.id_need_group            FROM proforma_send_need_group)))
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

CREATE OR REPLACE VIEW v_besoin_a_grouper AS SELECT v_besoin.department,     v_besoin.article,     v_besoin.quantity,     v_besoin.date_send,     v_besoin.date_need,     v_besoin.id_department_needs,     v_besoin.id_need_details,     v_besoin.validation,     v_besoin.id_article    FROM v_besoin   WHERE ((v_besoin.validation = 1) AND (NOT (v_besoin.id_need_details IN ( SELECT need_group_need.id_need_details            FROM need_group_need))))
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

CREATE OR REPLACE VIEW v_group_non_proformer AS SELECT n.id,     n.numero,     n.id_article,     n.quantity,     n.final_date_need,     a.name AS article    FROM (need_group n      JOIN article a ON ((a.id = n.id_article)))   WHERE (NOT (n.id IN ( SELECT proforma_send_need_group.id_need_group            FROM proforma_send_need_group)))
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

CREATE OR REPLACE VIEW v_group_proformer AS SELECT n.id,     n.numero,     n.id_article,     n.quantity,     n.final_date_need,     a.name AS article    FROM (need_group n      JOIN article a ON ((a.id = n.id_article)))   WHERE (n.id IN ( SELECT proforma_send_need_group.id_need_group            FROM proforma_send_need_group))
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

CREATE OR REPLACE VIEW v_group_proformer_details AS SELECT psng.id_need_group AS id,     ps.id_supplier,     s.name AS supplier,     ps.date_send,     ps.numero    FROM ((proforma_send ps      JOIN supplier s ON ((s.id = ps.id_supplier)))      JOIN proforma_send_need_group psng ON ((psng.id_proforma_send = ps.id)))
 SELECT psng.id_need_group AS id,
    ps.id_supplier,
    s.name AS supplier,
    ps.date_send,
    ps.numero
   FROM ((proforma_send ps
     JOIN supplier s ON ((s.id = ps.id_supplier)))
     JOIN proforma_send_need_group psng ON ((psng.id_proforma_send = ps.id)));

CREATE OR REPLACE VIEW v_proforma AS SELECT p.id,     p.date_received,     p.total_ht,     p.id_proforma_send,     p.total_tva,     p.total_ttc,     p.numero,     ps.date_send,     ps.numero AS numero_send,     s.name AS supplier    FROM ((proforma p      JOIN proforma_send ps ON ((ps.id = p.id_proforma_send)))      JOIN supplier s ON ((s.id = ps.id_supplier)))
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

CREATE OR REPLACE VIEW v_proforma_details AS SELECT pd.id,     pd.quantity,     pd.tva,     pd.unit_price,     pd.total_ht,     pd.id_proforma,     pd.id_article,     pd.id_need_group,     a.name AS article_name,     a.unit,     ng.numero    FROM ((proforma_details pd      JOIN article a ON ((a.id = pd.id_article)))      JOIN need_group ng ON ((ng.id = pd.id_need_group)))
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

CREATE OR REPLACE VIEW v_proforma_send AS SELECT ps.id,     ps.date_send,     ps.id_supplier,     ps.numero,     s.name,     s.address,     s.email,     s.phone_number    FROM (proforma_send ps      JOIN supplier s ON ((s.id = ps.id_supplier)))   WHERE (NOT (ps.id IN ( SELECT proforma.id_proforma_send            FROM proforma)))
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

CREATE OR REPLACE VIEW v_proforma_send_need_group AS SELECT psng.id,     psng.id_proforma_send,     psng.id_need_group,     ng.numero,     ng.id_article,     ng.quantity,     ng.final_date_need,     a.name AS article_name,     a.unit AS article_unit    FROM ((proforma_send_need_group psng      JOIN need_group ng ON ((ng.id = psng.id_need_group)))      JOIN article a ON ((a.id = ng.id_article)))
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

INSERT INTO article( id, name, unit ) VALUES ( 1, 'Article 1', 'Piece');
INSERT INTO article( id, name, unit ) VALUES ( 2, 'Article 2', 'Set');
INSERT INTO article( id, name, unit ) VALUES ( 3, 'Article 3', 'Box');
INSERT INTO department( id, name ) VALUES ( 1, 'Department A');
INSERT INTO department( id, name ) VALUES ( 2, 'Department B');
INSERT INTO department( id, name ) VALUES ( 3, 'Department C');
INSERT INTO department_needs( id, date_send, validation, id_department ) VALUES ( 1, '2023-11-20', 1, 1);
INSERT INTO department_needs( id, date_send, validation, id_department ) VALUES ( 2, '2023-11-21', 1, 2);
INSERT INTO department_needs( id, date_send, validation, id_department ) VALUES ( 3, '2023-11-22', 1, 3);
INSERT INTO need_details( id, quantity, motif, date_need, id_article, id_department_needs ) VALUES ( 1, 10.0, 'Urgent', '2023-11-25', 1, 1);
INSERT INTO need_details( id, quantity, motif, date_need, id_article, id_department_needs ) VALUES ( 2, 5.0, 'Standard', '2023-11-26', 2, 1);
INSERT INTO need_details( id, quantity, motif, date_need, id_article, id_department_needs ) VALUES ( 3, 8.0, 'Critical', '2023-11-27', 1, 2);
INSERT INTO need_details( id, quantity, motif, date_need, id_article, id_department_needs ) VALUES ( 4, 15.0, 'Routine', '2023-11-28', 2, 3);
INSERT INTO need_details( id, quantity, motif, date_need, id_article, id_department_needs ) VALUES ( 5, 7.0, 'Critical', '2023-11-29', 3, 1);
INSERT INTO need_details( id, quantity, motif, date_need, id_article, id_department_needs ) VALUES ( 6, 20.0, 'Urgent', '2023-12-01', 1, 3);
INSERT INTO need_group( id, numero, id_article, quantity, final_date_need ) VALUES ( 14, 'NG2', 2, 20.0, '2023-11-26');
INSERT INTO need_group( id, numero, id_article, quantity, final_date_need ) VALUES ( 15, 'NG5', 3, 7.0, '2023-11-29');
INSERT INTO need_group( id, numero, id_article, quantity, final_date_need ) VALUES ( 13, 'NG1', 1, 38.0, '2023-11-25');
INSERT INTO need_group_need( id, id_need_details, id_need_group ) VALUES ( 3, 1, 13);
INSERT INTO need_group_need( id, id_need_details, id_need_group ) VALUES ( 4, 2, 14);
INSERT INTO need_group_need( id, id_need_details, id_need_group ) VALUES ( 5, 3, 13);
INSERT INTO need_group_need( id, id_need_details, id_need_group ) VALUES ( 6, 4, 14);
INSERT INTO need_group_need( id, id_need_details, id_need_group ) VALUES ( 7, 5, 15);
INSERT INTO need_group_need( id, id_need_details, id_need_group ) VALUES ( 8, 6, 13);
INSERT INTO supplier( id, name, address, email, phone_number ) VALUES ( 1, 'Supplier 1', 'Address 1', 'kelydoda724@gmail.com', '1234567890');
INSERT INTO supplier( id, name, address, email, phone_number ) VALUES ( 2, 'Supplier 2', 'Address 2', 'kelydoda724@gmail.com', '9876543210');
INSERT INTO supplier( id, name, address, email, phone_number ) VALUES ( 3, 'Supplier 3', 'Address 3', 'kelydoda724@gmail.com', '5555555555');
INSERT INTO proforma_send( id, date_send, id_supplier, numero ) VALUES ( 2, '2023-11-10', 2, 'ENV2');
INSERT INTO proforma_send( id, date_send, id_supplier, numero ) VALUES ( 4, '2023-11-11', 3, 'ENV4');
INSERT INTO proforma_send( id, date_send, id_supplier, numero ) VALUES ( 5, '2023-11-10', 3, 'ENV5');
INSERT INTO proforma_send( id, date_send, id_supplier, numero ) VALUES ( 6, '2023-11-10', 3, 'ENV6');
INSERT INTO proforma_send( id, date_send, id_supplier, numero ) VALUES ( 7, '2023-11-10', 3, 'ENV7');
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 1, 2, 13);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 2, 2, 14);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 3, 4, 13);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 4, 5, 14);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 5, 6, 13);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 6, 6, 14);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 7, 7, 13);
INSERT INTO proforma_send_need_group( id, id_proforma_send, id_need_group ) VALUES ( 8, 7, 14);
INSERT INTO proforma( id, date_received, total_ht, id_proforma_send, total_tva, total_ttc, numero ) VALUES ( 9, '2023-10-10', 580.0, 2, 0.0, 580.0, 'PRF9');
INSERT INTO proforma( id, date_received, total_ht, id_proforma_send, total_tva, total_ttc, numero ) VALUES ( 10, '2023-11-20', 3800.0, 4, 0.0, 3800.0, 'PRF10');
INSERT INTO proforma_details( id, quantity, tva, unit_price, total_ht, id_proforma, id_article, id_need_group ) VALUES ( 12, 20.0, 0.0, 10.0, 200.0, 9, 2, 14);
INSERT INTO proforma_details( id, quantity, tva, unit_price, total_ht, id_proforma, id_article, id_need_group ) VALUES ( 13, 38.0, 0.0, 10.0, 380.0, 9, 1, 13);
INSERT INTO proforma_details( id, quantity, tva, unit_price, total_ht, id_proforma, id_article, id_need_group ) VALUES ( 14, 38.0, 0.0, 100.0, 3800.0, 10, 1, 13);
