CREATE SCHEMA IF NOT EXISTS "public";

CREATE SEQUENCE account_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE article_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE article_supplier_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE department_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE department_needs_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE need_details_id_seq START WITH 1 INCREMENT BY 1;

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
	CONSTRAINT fk_need_details_department_needs FOREIGN KEY ( id_department_needs ) REFERENCES department_needs( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_details_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE need_group ( 
	id                   serial  NOT NULL  ,
	numero               varchar(100)  NOT NULL  ,
	id_article           serial  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	final_date_need      date  NOT NULL  ,
	CONSTRAINT pk_need_group PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE need_group_need ( 
	id                   serial  NOT NULL  ,
	id_need_details      integer  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	CONSTRAINT pk_need_group_need PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_need_need_details FOREIGN KEY ( id_need_details ) REFERENCES need_details( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_group_need_need_group FOREIGN KEY ( id_need_group ) REFERENCES need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE 
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
	CONSTRAINT fk_article_supplier_supplier FOREIGN KEY ( id_supplier ) REFERENCES supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_article_supplier_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma_send ( 
	id                   integer DEFAULT nextval('proforma_send_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_supplier FOREIGN KEY ( id_supplier ) REFERENCES supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma_send_details ( 
	id                   integer DEFAULT nextval('proforma_send_details_id_seq'::regclass) NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_details_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE purchase_order ( 
	id                   integer DEFAULT nextval('purchase_order_id_seq'::regclass) NOT NULL  ,
	date_send            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	CONSTRAINT pk_purchase_order PRIMARY KEY ( id ),
	CONSTRAINT fk_purchase_order_supplier FOREIGN KEY ( id_supplier ) REFERENCES supplier( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE need_group_proforma_send ( 
	id                   serial  NOT NULL  ,
	id_need_group        integer  NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_group_need_proforma PRIMARY KEY ( id ),
	CONSTRAINT fk_need_group_proforma_need_group FOREIGN KEY ( id_need_group ) REFERENCES need_group( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_need_group_proforma_send_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma ( 
	id                   integer DEFAULT nextval('proformat_id_seq'::regclass) NOT NULL  ,
	date_received        date  NOT NULL  ,
	total_price          double precision    ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_proformat PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma_details ( 
	id                   integer DEFAULT nextval('proformat_details_id_seq'::regclass) NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	tva                  double precision  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	total_price          double precision  NOT NULL  ,
	id_proforma          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	CONSTRAINT pk_proformat_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_details_proforma FOREIGN KEY ( id_proforma ) REFERENCES proforma( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_details_article FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "purchase order_details" ( 
	id                   integer DEFAULT nextval('"purchase order_details_id_seq"'::regclass) NOT NULL  ,
	"id_purchase order"  integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	status               integer  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	vat                  double precision  NOT NULL  ,
	description          varchar  NOT NULL  ,
	CONSTRAINT "fk_purchase order_details_purchase_order" FOREIGN KEY ( "id_purchase order" ) REFERENCES purchase_order( id ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT "fk_purchase order_details_article" FOREIGN KEY ( id_article ) REFERENCES article( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE OR REPLACE VIEW v_besoin AS SELECT de.name AS department,     a.name AS article,     n.quantity,     d.date_send,     n.date_need, n.id_department_needs,n.id as id_need_details,d.validation , a.id AS id_article    FROM (((need_details n      JOIN department_needs d ON ((d.id = n.id_department_needs)))      JOIN department de ON ((de.id = d.id_department)))      JOIN article a ON ((a.id = n.id_article)));
 SELECT de.name AS department,
    a.name AS article,
    n.quantity,
    d.date_send,
    n.date_need,
   FROM (((need_details n
     JOIN department_needs d ON ((d.id = n.id_department_needs)))
     JOIN department de ON ((de.id = d.id_department)))
     JOIN article a ON ((a.id = n.id_article)));

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


-- 
create or replace view v_besoin_a_grouper as
select * from v_besoin where validation=1 and id_need_details not in (select id_need_details from need_group_need);
-- 
create or replace view v_group_non_proformer as
select n.*,a.name as article from need_group n join article a on a.id=n.id_article  where n.id not in (select id_need_group from proforma_send_need_group);
-- 
create or replace view v_besoin_a_afficher as
select v.* from v_besoin v join need_group_need n on n.id_need_details=v.id_need_details where n.id_need_group not in (select id_need_group from proforma_send_need_group);
-- 


INSERT INTO supplier (name, address, email, phone_number)
VALUES
    ('Supplier 1', 'Address 1', 'supplier1@example.com', '1234567890'),
    ('Supplier 2', 'Address 2', 'supplier2@example.com', '9876543210'),
    ('Supplier 3', 'Address 3', 'supplier3@example.com', '5555555555');

create or replace view v_group_proformer as
select n.id,n.numero,n.id_article,n.quantity,n.final_date_need,a.name as article  from need_group n join article a on a.id=n.id_article where n.id in (select id_need_group from proforma_send_need_group);


create or replace view v_group_proformer_details as 
select psng.id_need_group as id,ps.id_supplier,s.name as supplier,ps.date_send,ps.numero from proforma_send ps join supplier s on s.id=ps.id_supplier join proforma_send_need_group psng on psng.id_proforma_send=ps.id;


create or replace view v_proforma_send as
select ps.*,s.name,s.address,s.email,s.phone_number from proforma_send ps join supplier s on s.id=ps.id_supplier where ps.id not in (select id_proforma_send from proforma);

create or replace view v_proforma_send_need_group as
select psng.*,ng.numero,ng.id_article,ng.quantity,ng.final_date_need,a.name as article_name,a.unit as article_unit from proforma_send_need_group psng join need_group ng on ng.id=psng.id_need_group join article a on a.id=ng.id_article;

create or replace view v_proforma as
select p.*,ps.date_send,ps.numero as numero_send,s.name as supplier from proforma p join proforma_send ps on ps.id=p.id_proforma_send join supplier s on s.id=ps.id_supplier;


create or replace view v_proforma_details  as 
select pd.*,a.name as article_name,a.unit,ng.numero from proforma_details pd join  article a on a.id=pd.id_article join need_group ng on ng.id=pd.id_need_group;


create or replace view moins_disant as 
select ng.numero as need_numero,a.name as article_name,pd.quantity,pd.unit_price,pd.tva,pd.total_ht,s.name as supplier_name,p.numero as proforma_numero,p.date_received  from need_group ng join proforma_details pd on ng.id=pd.id_need_group join article a on a.id=pd.id_article join proforma p on p.id=pd.id_proforma join proforma_send ps on ps.id=p.id_proforma_send join supplier s on s.id=ps.id_supplier  where (ng.id,pd.unit_price) in (select id_need_group,min(unit_price) from proforma_details group by id_need_group);

create or replace view v_article_email as
select ps.id,ng.quantity,a.name,a.unit from proforma_send ps join proforma_send_need_group psng on ps.id=psng.id_proforma_send join need_group ng on ng.id=psng.id_need_group join article a on a.id=ng.id_article;

INSERT INTO department (id,name) VALUES
    (1,'Sales'),
    (2,'Marketing'),
    (3,'Finance');

INSERT INTO account (fullname, email, password, profil, id_department) VALUES
    ('John Doe', 'john@example.com', 'pass123', 'admin', 1),
    ('Jane Smith', 'jane@example.com', 'pass456', 'manager', 1),
    ('Alice Johnson', 'alice@example.com', 'pass789', 'employee', 1),

    ('Robert Brown', 'robert@example.com', 'pass123', 'admin', 2),
    ('Emily Davis', 'emily@example.com', 'pass456', 'manager', 2),
    ('Michael Clark', 'michael@example.com', 'pass789', 'employee', 2),

    ('Sarah Wilson', 'sarah@example.com', 'pass123', 'admin', 3),
    ('David Garcia', 'david@example.com', 'pass456', 'manager', 3),
    ('Olivia Martinez', 'olivia@example.com', 'pass789', 'employee', 3);


create or replace view v_account as
select a.*,d.name as department_name from account a join department d on d.id=a.id_department;


vbue urgy bohg kemq
