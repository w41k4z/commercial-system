

CREATE  TABLE article_supplier ( 
	id                   serial  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	status               integer  NOT NULL  ,
	CONSTRAINT pk_article_supplier PRIMARY KEY ( id ),
	CONSTRAINT unq_article_supplier_id_article UNIQUE ( id_article ) ,
	CONSTRAINT unq_article_supplier_id_supplier UNIQUE ( id_supplier ) 
 );

CREATE  TABLE need_details ( 
	id                   serial  NOT NULL  ,
	id_department_needs  integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	motif                varchar  NOT NULL  ,
	CONSTRAINT pk_need_details PRIMARY KEY ( id ),
	CONSTRAINT unq_need_details_id_department_needs UNIQUE ( id_department_needs ) ,
	CONSTRAINT unq_need_details_id_article UNIQUE ( id_article ) 
 );

CREATE  TABLE proforma_details ( 
	id                   serial  NOT NULL  ,
	id_proforma          integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	tva                  double precision  NOT NULL  ,
	sale_price           double precision  NOT NULL  ,
	total_price          double precision  NOT NULL  ,
	CONSTRAINT pk_proformat_details PRIMARY KEY ( id ),
	CONSTRAINT unq_proforma_details_id_proforma UNIQUE ( id_proforma ) ,
	CONSTRAINT unq_proforma_details_id_article UNIQUE ( id_article ) 
 );

CREATE  TABLE proforma_send ( 
	id                   serial  NOT NULL  ,
	date_send            date  NOT NULL  ,
	CONSTRAINT pk_proforma_send PRIMARY KEY ( id )
 );

CREATE  TABLE proforma_send_details ( 
	id                   serial  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_proforma_send_details PRIMARY KEY ( id ),
	CONSTRAINT fk_proforma_send_details_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE purchase_order ( 
	id                   serial  NOT NULL  ,
	date_send            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	CONSTRAINT pk_purchase_order PRIMARY KEY ( id )
 );

CREATE  TABLE department_needs ( 
	id                   serial  NOT NULL  ,
	id_department        integer  NOT NULL  ,
	date_send            date  NOT NULL  ,
	date_need            date  NOT NULL  ,
	validation           integer  NOT NULL  ,
	CONSTRAINT pk_needs PRIMARY KEY ( id ),
	CONSTRAINT unq_department_needs_id_department UNIQUE ( id_department ) ,
	CONSTRAINT fk_department_needs_need_details FOREIGN KEY ( id ) REFERENCES need_details( id_department_needs ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE proforma ( 
	id                   serial  NOT NULL  ,
	id_supplier          integer  NOT NULL  ,
	date_received        date  NOT NULL  ,
	total_price          double precision    ,
	id_proforma_send     integer  NOT NULL  ,
	CONSTRAINT pk_proformat PRIMARY KEY ( id ),
	CONSTRAINT unq_proforma_id_supplier UNIQUE ( id_supplier ) ,
	CONSTRAINT fk_proforma_proforma_details FOREIGN KEY ( id ) REFERENCES proforma_details( id_proforma ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_proforma_proforma_send FOREIGN KEY ( id_proforma_send ) REFERENCES proforma_send( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE "purchase order_details" ( 
	id                   serial  NOT NULL  ,
	"id_purchase order"  integer  NOT NULL  ,
	id_article           integer  NOT NULL  ,
	quantity             double precision  NOT NULL  ,
	date_need            date  NOT NULL  ,
	CONSTRAINT "pk_purchase order_details" PRIMARY KEY ( id ),
	CONSTRAINT "unq_purchase order_details_id_article" UNIQUE ( id_article ) ,
	CONSTRAINT "fk_purchase order_details_purchase_order" FOREIGN KEY ( "id_purchase order" ) REFERENCES purchase_order( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE supplier ( 
	id                   serial  NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	address              varchar(100)  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	phone_number         varchar  NOT NULL  ,
	CONSTRAINT pk_supplier PRIMARY KEY ( id ),
	CONSTRAINT fk_supplier_article_supplier FOREIGN KEY ( id ) REFERENCES article_supplier( id_supplier ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_supplier_proforma FOREIGN KEY ( id ) REFERENCES proforma( id_supplier ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE article ( 
	id                   serial  NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	unit                 varchar  NOT NULL  ,
	CONSTRAINT pk_article PRIMARY KEY ( id ),
	CONSTRAINT fk_article_article_supplier FOREIGN KEY ( id ) REFERENCES article_supplier( id_article ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_article_need_details FOREIGN KEY ( id ) REFERENCES need_details( id_article ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT fk_article_proforma_details FOREIGN KEY ( id ) REFERENCES proforma_details( id_article ) ON DELETE CASCADE ON UPDATE CASCADE ,
	CONSTRAINT "fk_article_purchase order_details" FOREIGN KEY ( id ) REFERENCES "purchase order_details"( id_article ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE department ( 
	id                   serial  NOT NULL  ,
	name                 varchar(100)  NOT NULL  ,
	CONSTRAINT pk_department PRIMARY KEY ( id ),
	CONSTRAINT fk_department_department_needs FOREIGN KEY ( id ) REFERENCES department_needs( id_department ) ON DELETE CASCADE ON UPDATE CASCADE 
 );

CREATE  TABLE account ( 
	id                   serial  NOT NULL  ,
	email                varchar(100)  NOT NULL  ,
	"password"           varchar  NOT NULL  ,
	profil               integer  NOT NULL  ,
	id_department        integer  NOT NULL  ,
	CONSTRAINT pk_account PRIMARY KEY ( id ),
	CONSTRAINT fk_account_department FOREIGN KEY ( id_department ) REFERENCES department( id ) ON DELETE CASCADE ON UPDATE CASCADE 
 );


--  Data


