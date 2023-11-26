using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class firstmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "account_id_seq");

            migrationBuilder.CreateSequence(
                name: "article_id_seq");

            migrationBuilder.CreateSequence(
                name: "article_supplier_id_seq");

            migrationBuilder.CreateSequence(
                name: "department_id_seq");

            migrationBuilder.CreateSequence(
                name: "department_needs_id_seq");

            migrationBuilder.CreateSequence(
                name: "need_details_id_seq");

            migrationBuilder.CreateSequence(
                name: "proforma_send_details_id_seq");

            migrationBuilder.CreateSequence(
                name: "proforma_send_id_seq");

            migrationBuilder.CreateSequence(
                name: "proformat_details_id_seq");

            migrationBuilder.CreateSequence(
                name: "proformat_id_seq");

            migrationBuilder.CreateSequence(
                name: "purchase_order_details_id_seq");

            migrationBuilder.CreateSequence(
                name: "purchase_order_id_seq");

            migrationBuilder.CreateSequence(
                name: "supplier_id_seq");

            migrationBuilder.CreateTable(
                name: "article",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    unit = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_article", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "department",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "supplier",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phonenumber = table.Column<string>(name: "phone_number", type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_supplier", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "need_group",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    numero = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    idarticle = table.Column<int>(name: "id_article", type: "integer", nullable: false),
                    quantity = table.Column<double>(type: "double precision", nullable: false),
                    finaldateneed = table.Column<DateOnly>(name: "final_date_need", type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_need_group", x => x.id);
                    table.ForeignKey(
                        name: "fk_need_group_article",
                        column: x => x.idarticle,
                        principalTable: "article",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "account",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying", nullable: false),
                    profil = table.Column<int>(type: "integer", nullable: false),
                    iddepartment = table.Column<int>(name: "id_department", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_account", x => x.id);
                    table.ForeignKey(
                        name: "fk_account_department",
                        column: x => x.iddepartment,
                        principalTable: "department",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "department_needs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    datesend = table.Column<DateOnly>(name: "date_send", type: "date", nullable: false),
                    validation = table.Column<int>(type: "integer", nullable: false),
                    iddepartment = table.Column<int>(name: "id_department", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department_needs", x => x.id);
                    table.ForeignKey(
                        name: "fk_department_needs_department",
                        column: x => x.iddepartment,
                        principalTable: "department",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "article_supplier",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    status = table.Column<int>(type: "integer", nullable: false),
                    idsupplier = table.Column<int>(name: "id_supplier", type: "integer", nullable: false),
                    idarticle = table.Column<int>(name: "id_article", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_article_supplier", x => x.id);
                    table.ForeignKey(
                        name: "fk_article_supplier_article",
                        column: x => x.idarticle,
                        principalTable: "article",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_article_supplier_supplier",
                        column: x => x.idsupplier,
                        principalTable: "supplier",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "proforma_send",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    datesend = table.Column<DateOnly>(name: "date_send", type: "date", nullable: false),
                    idsupplier = table.Column<int>(name: "id_supplier", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proforma_send", x => x.id);
                    table.ForeignKey(
                        name: "fk_proforma_send_supplier",
                        column: x => x.idsupplier,
                        principalTable: "supplier",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "purchase_order",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    datesend = table.Column<DateOnly>(name: "date_send", type: "date", nullable: false),
                    validation = table.Column<int>(type: "integer", nullable: false),
                    idsupplier = table.Column<int>(name: "id_supplier", type: "integer", nullable: false),
                    sumht = table.Column<double>(name: "sum_ht", type: "double precision", nullable: false),
                    sumvat = table.Column<double>(name: "sum_vat", type: "double precision", nullable: false),
                    sumttc = table.Column<double>(name: "sum_ttc", type: "double precision", nullable: false),
                    parcelcharges = table.Column<double>(name: "parcel_charges", type: "double precision", nullable: false),
                    discount = table.Column<double>(type: "double precision", nullable: false),
                    payment = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_purchase_order", x => x.id);
                    table.ForeignKey(
                        name: "fk_purchase_order_supplier",
                        column: x => x.idsupplier,
                        principalTable: "supplier",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "need_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    quantity = table.Column<double>(type: "double precision", nullable: false),
                    motif = table.Column<string>(type: "character varying", nullable: false),
                    dateneed = table.Column<DateOnly>(name: "date_need", type: "date", nullable: false),
                    idarticle = table.Column<int>(name: "id_article", type: "integer", nullable: false),
                    iddepartmentneeds = table.Column<int>(name: "id_department_needs", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_need_details", x => x.id);
                    table.ForeignKey(
                        name: "fk_need_details_article",
                        column: x => x.idarticle,
                        principalTable: "article",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_need_details_department_needs",
                        column: x => x.iddepartmentneeds,
                        principalTable: "department_needs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "need_group_proforma_send",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idneedgroup = table.Column<int>(name: "id_need_group", type: "integer", nullable: false),
                    idproformasend = table.Column<int>(name: "id_proforma_send", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_need_group_proforma_send", x => x.id);
                    table.ForeignKey(
                        name: "fk_need_group_proforma_need_group",
                        column: x => x.idneedgroup,
                        principalTable: "need_group",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_need_group_proforma_send_proforma_send",
                        column: x => x.idproformasend,
                        principalTable: "proforma_send",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "proforma",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('proformat_id_seq'::regclass)"),
                    datereceived = table.Column<DateOnly>(name: "date_received", type: "date", nullable: false),
                    totalprice = table.Column<double>(name: "total_price", type: "double precision", nullable: true),
                    idproformasend = table.Column<int>(name: "id_proforma_send", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proforma", x => x.id);
                    table.ForeignKey(
                        name: "fk_proforma_proforma_send",
                        column: x => x.idproformasend,
                        principalTable: "proforma_send",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "proforma_send_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idarticle = table.Column<int>(name: "id_article", type: "integer", nullable: false),
                    quantity = table.Column<double>(type: "double precision", nullable: false),
                    dateneed = table.Column<DateOnly>(name: "date_need", type: "date", nullable: false),
                    idproformasend = table.Column<int>(name: "id_proforma_send", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proforma_send_details", x => x.id);
                    table.ForeignKey(
                        name: "fk_proforma_send_details_proforma_send",
                        column: x => x.idproformasend,
                        principalTable: "proforma_send",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "purchase order_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('purchase_order_details_id_seq'::regclass)"),
                    idpurchaseorder = table.Column<int>(name: "id_purchase order", type: "integer", nullable: false),
                    idarticle = table.Column<int>(name: "id_article", type: "integer", nullable: false),
                    quantity = table.Column<double>(type: "double precision", nullable: false),
                    dateneed = table.Column<DateOnly>(name: "date_need", type: "date", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    saleprice = table.Column<double>(name: "sale_price", type: "double precision", nullable: false),
                    vat = table.Column<double>(type: "double precision", nullable: false),
                    description = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "fk_purchase order_details_article",
                        column: x => x.idarticle,
                        principalTable: "article",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_purchase order_details_purchase_order",
                        column: x => x.idpurchaseorder,
                        principalTable: "purchase_order",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "need_group_need",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idneeddetails = table.Column<int>(name: "id_need_details", type: "integer", nullable: false),
                    idneedgroup = table.Column<int>(name: "id_need_group", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_need_group_need", x => x.id);
                    table.ForeignKey(
                        name: "fk_need_group_need_need_details",
                        column: x => x.idneeddetails,
                        principalTable: "need_details",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_need_group_need_need_group",
                        column: x => x.idneedgroup,
                        principalTable: "need_group",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "proforma_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('proformat_details_id_seq'::regclass)"),
                    quantity = table.Column<double>(type: "double precision", nullable: false),
                    tva = table.Column<double>(type: "double precision", nullable: false),
                    saleprice = table.Column<double>(name: "sale_price", type: "double precision", nullable: false),
                    totalprice = table.Column<double>(name: "total_price", type: "double precision", nullable: false),
                    idproforma = table.Column<int>(name: "id_proforma", type: "integer", nullable: false),
                    idarticle = table.Column<int>(name: "id_article", type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proforma_details", x => x.id);
                    table.ForeignKey(
                        name: "fk_proforma_details_article",
                        column: x => x.idarticle,
                        principalTable: "article",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_proforma_details_proforma",
                        column: x => x.idproforma,
                        principalTable: "proforma",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_account_id_department",
                table: "account",
                column: "id_department");

            migrationBuilder.CreateIndex(
                name: "IX_article_supplier_id_article",
                table: "article_supplier",
                column: "id_article");

            migrationBuilder.CreateIndex(
                name: "IX_article_supplier_id_supplier",
                table: "article_supplier",
                column: "id_supplier");

            migrationBuilder.CreateIndex(
                name: "IX_department_needs_id_department",
                table: "department_needs",
                column: "id_department");

            migrationBuilder.CreateIndex(
                name: "IX_need_details_id_article",
                table: "need_details",
                column: "id_article");

            migrationBuilder.CreateIndex(
                name: "IX_need_details_id_department_needs",
                table: "need_details",
                column: "id_department_needs");

            migrationBuilder.CreateIndex(
                name: "IX_need_group_id_article",
                table: "need_group",
                column: "id_article");

            migrationBuilder.CreateIndex(
                name: "IX_need_group_need_id_need_details",
                table: "need_group_need",
                column: "id_need_details");

            migrationBuilder.CreateIndex(
                name: "IX_need_group_need_id_need_group",
                table: "need_group_need",
                column: "id_need_group");

            migrationBuilder.CreateIndex(
                name: "IX_need_group_proforma_send_id_need_group",
                table: "need_group_proforma_send",
                column: "id_need_group");

            migrationBuilder.CreateIndex(
                name: "IX_need_group_proforma_send_id_proforma_send",
                table: "need_group_proforma_send",
                column: "id_proforma_send");

            migrationBuilder.CreateIndex(
                name: "IX_proforma_id_proforma_send",
                table: "proforma",
                column: "id_proforma_send");

            migrationBuilder.CreateIndex(
                name: "IX_proforma_details_id_article",
                table: "proforma_details",
                column: "id_article");

            migrationBuilder.CreateIndex(
                name: "IX_proforma_details_id_proforma",
                table: "proforma_details",
                column: "id_proforma");

            migrationBuilder.CreateIndex(
                name: "IX_proforma_send_id_supplier",
                table: "proforma_send",
                column: "id_supplier");

            migrationBuilder.CreateIndex(
                name: "IX_proforma_send_details_id_proforma_send",
                table: "proforma_send_details",
                column: "id_proforma_send");

            migrationBuilder.CreateIndex(
                name: "IX_purchase order_details_id_article",
                table: "purchase order_details",
                column: "id_article");

            migrationBuilder.CreateIndex(
                name: "IX_purchase order_details_id_purchase order",
                table: "purchase order_details",
                column: "id_purchase order");

            migrationBuilder.CreateIndex(
                name: "IX_purchase_order_id_supplier",
                table: "purchase_order",
                column: "id_supplier");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "account");

            migrationBuilder.DropTable(
                name: "article_supplier");

            migrationBuilder.DropTable(
                name: "need_group_need");

            migrationBuilder.DropTable(
                name: "need_group_proforma_send");

            migrationBuilder.DropTable(
                name: "proforma_details");

            migrationBuilder.DropTable(
                name: "proforma_send_details");

            migrationBuilder.DropTable(
                name: "purchase order_details");

            migrationBuilder.DropTable(
                name: "need_details");

            migrationBuilder.DropTable(
                name: "need_group");

            migrationBuilder.DropTable(
                name: "proforma");

            migrationBuilder.DropTable(
                name: "purchase_order");

            migrationBuilder.DropTable(
                name: "department_needs");

            migrationBuilder.DropTable(
                name: "article");

            migrationBuilder.DropTable(
                name: "proforma_send");

            migrationBuilder.DropTable(
                name: "department");

            migrationBuilder.DropTable(
                name: "supplier");

            migrationBuilder.DropSequence(
                name: "account_id_seq");

            migrationBuilder.DropSequence(
                name: "article_id_seq");

            migrationBuilder.DropSequence(
                name: "article_supplier_id_seq");

            migrationBuilder.DropSequence(
                name: "department_id_seq");

            migrationBuilder.DropSequence(
                name: "department_needs_id_seq");

            migrationBuilder.DropSequence(
                name: "need_details_id_seq");

            migrationBuilder.DropSequence(
                name: "proforma_send_details_id_seq");

            migrationBuilder.DropSequence(
                name: "proforma_send_id_seq");

            migrationBuilder.DropSequence(
                name: "proformat_details_id_seq");

            migrationBuilder.DropSequence(
                name: "proformat_id_seq");

            migrationBuilder.DropSequence(
                name: "purchase_order_details_id_seq");

            migrationBuilder.DropSequence(
                name: "purchase_order_id_seq");

            migrationBuilder.DropSequence(
                name: "supplier_id_seq");
        }
    }
}
