using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace server.Models
{
    public partial class CommercialSystemContext : DbContext
    {
        public CommercialSystemContext()
        {
        }

        public CommercialSystemContext(DbContextOptions<CommercialSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Article> Articles { get; set; } = null!;
        public virtual DbSet<ArticleSupplier> ArticleSuppliers { get; set; } = null!;
        public virtual DbSet<BonEntree> BonEntrees { get; set; } = null!;
        public virtual DbSet<BonEntreeDetail> BonEntreeDetails { get; set; } = null!;
        public virtual DbSet<BonSortie> BonSorties { get; set; } = null!;
        public virtual DbSet<BonSortieDetail> BonSortieDetails { get; set; } = null!;
        public virtual DbSet<Company> Companies { get; set; } = null!;
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<DepartmentNeed> DepartmentNeeds { get; set; } = null!;
        public virtual DbSet<Magasin> Magasins { get; set; } = null!;
        public virtual DbSet<MoinsDisant> MoinsDisants { get; set; } = null!;
        public virtual DbSet<NeedDetail> NeedDetails { get; set; } = null!;
        public virtual DbSet<NeedGroup> NeedGroups { get; set; } = null!;
        public virtual DbSet<NeedGroupNeed> NeedGroupNeeds { get; set; } = null!;
        public virtual DbSet<Proforma> Proformas { get; set; } = null!;
        public virtual DbSet<ProformaDetail> ProformaDetails { get; set; } = null!;
        public virtual DbSet<ProformaSend> ProformaSends { get; set; } = null!;
        public virtual DbSet<ProformaSendNeedGroup> ProformaSendNeedGroups { get; set; } = null!;
        public virtual DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
        public virtual DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<VAccount> VAccounts { get; set; } = null!;
        public virtual DbSet<VArticleEmail> VArticleEmails { get; set; } = null!;
        public virtual DbSet<VBesoin> VBesoins { get; set; } = null!;
        public virtual DbSet<VBesoinAAfficher> VBesoinAAffichers { get; set; } = null!;
        public virtual DbSet<VBesoinAGrouper> VBesoinAGroupers { get; set; } = null!;
        public virtual DbSet<VBonEntree> VBonEntrees { get; set; } = null!;
        public virtual DbSet<VBonEntreeDetail> VBonEntreeDetails { get; set; } = null!;
        public virtual DbSet<VBonSortie> VBonSorties { get; set; } = null!;
        public virtual DbSet<VBonSortieDetial> VBonSortieDetials { get; set; } = null!;
        public virtual DbSet<VGroupNonProformer> VGroupNonProformers { get; set; } = null!;
        public virtual DbSet<VGroupProformer> VGroupProformers { get; set; } = null!;
        public virtual DbSet<VGroupProformerDetail> VGroupProformerDetails { get; set; } = null!;
        public virtual DbSet<VProforma> VProformas { get; set; } = null!;
        public virtual DbSet<VProformaDetail> VProformaDetails { get; set; } = null!;
        public virtual DbSet<VProformaSend> VProformaSends { get; set; } = null!;
        public virtual DbSet<VProformaSendNeedGroup> VProformaSendNeedGroups { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Name=ConnectionStrings:DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("account");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(100)
                    .HasColumnName("fullname");

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Password)
                    .HasColumnType("character varying")
                    .HasColumnName("password");

                entity.Property(e => e.Profil)
                    .HasMaxLength(100)
                    .HasColumnName("profil");

                entity.HasOne(d => d.IdDepartmentNavigation)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.IdDepartment)
                    .HasConstraintName("fk_account_department");
            });

            modelBuilder.Entity<Article>(entity =>
            {
                entity.ToTable("article");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Unit)
                    .HasColumnType("character varying")
                    .HasColumnName("unit");
            });

            modelBuilder.Entity<ArticleSupplier>(entity =>
            {
                entity.ToTable("article_supplier");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany(p => p.ArticleSuppliers)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("fk_article_supplier_article");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.ArticleSuppliers)
                    .HasForeignKey(d => d.IdSupplier)
                    .HasConstraintName("fk_article_supplier_supplier");
            });

            modelBuilder.Entity<BonEntree>(entity =>
            {
                entity.ToTable("bon_entree");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateEntree).HasColumnName("date_entree");

                entity.Property(e => e.IdMagasin).HasColumnName("id_magasin");

                entity.Property(e => e.IdRecuPar).HasColumnName("id_recu_par");

                entity.Property(e => e.IdRemisPar).HasColumnName("id_remis_par");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.HasOne(d => d.IdMagasinNavigation)
                    .WithMany(p => p.BonEntrees)
                    .HasForeignKey(d => d.IdMagasin)
                    .HasConstraintName("bon_entree_id_magasin_fkey");

                entity.HasOne(d => d.IdRecuParNavigation)
                    .WithMany(p => p.BonEntreeIdRecuParNavigations)
                    .HasForeignKey(d => d.IdRecuPar)
                    .HasConstraintName("bon_entree_id_recu_par_fkey");

                entity.HasOne(d => d.IdRemisParNavigation)
                    .WithMany(p => p.BonEntreeIdRemisParNavigations)
                    .HasForeignKey(d => d.IdRemisPar)
                    .HasConstraintName("bon_entree_id_remis_par_fkey");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.BonEntrees)
                    .HasForeignKey(d => d.IdSupplier)
                    .HasConstraintName("bon_entree_id_supplier_fkey");
            });

            modelBuilder.Entity<BonEntreeDetail>(entity =>
            {
                entity.ToTable("bon_entree_details");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdBonEntree).HasColumnName("id_bon_entree");

                entity.Property(e => e.Observation)
                    .HasMaxLength(200)
                    .HasColumnName("observation");

                entity.Property(e => e.Quantite).HasColumnName("quantite");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany(p => p.BonEntreeDetails)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("bon_entree_details_id_article_fkey");

                entity.HasOne(d => d.IdBonEntreeNavigation)
                    .WithMany(p => p.BonEntreeDetails)
                    .HasForeignKey(d => d.IdBonEntree)
                    .HasConstraintName("bon_entree_details_id_bon_entree_fkey");
            });

            modelBuilder.Entity<BonSortie>(entity =>
            {
                entity.ToTable("bon_sortie");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateSortie).HasColumnName("date_sortie");

                entity.Property(e => e.IdDemande).HasColumnName("id_demande");

                entity.Property(e => e.IdMagasin).HasColumnName("id_magasin");

                entity.Property(e => e.IdRemis).HasColumnName("id_remis");

                entity.HasOne(d => d.IdDemandeNavigation)
                    .WithMany(p => p.BonSortieIdDemandeNavigations)
                    .HasForeignKey(d => d.IdDemande)
                    .HasConstraintName("bon_sortie_id_demande_fkey");

                entity.HasOne(d => d.IdMagasinNavigation)
                    .WithMany(p => p.BonSorties)
                    .HasForeignKey(d => d.IdMagasin)
                    .HasConstraintName("bon_sortie_id_magasin_fkey");

                entity.HasOne(d => d.IdRemisNavigation)
                    .WithMany(p => p.BonSortieIdRemisNavigations)
                    .HasForeignKey(d => d.IdRemis)
                    .HasConstraintName("bon_sortie_id_remis_fkey");
            });

            modelBuilder.Entity<BonSortieDetail>(entity =>
            {
                entity.ToTable("bon_sortie_details");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdBonSortie).HasColumnName("id_bon_sortie");

                entity.Property(e => e.PrixUnitaire).HasColumnName("prix_unitaire");

                entity.Property(e => e.QuantiteDemande).HasColumnName("quantite_demande");

                entity.Property(e => e.QuantiteLivre).HasColumnName("quantite_livre");

                entity.Property(e => e.Total).HasColumnName("total");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany(p => p.BonSortieDetails)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("bon_sortie_details_id_article_fkey");

                entity.HasOne(d => d.IdBonSortieNavigation)
                    .WithMany(p => p.BonSortieDetails)
                    .HasForeignKey(d => d.IdBonSortie)
                    .HasConstraintName("bon_sortie_details_id_bon_sortie_fkey");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("company");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Tel)
                    .HasColumnType("character varying")
                    .HasColumnName("tel");
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("department");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<DepartmentNeed>(entity =>
            {
                entity.ToTable("department_needs");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Validation).HasColumnName("validation");

                entity.HasOne(d => d.IdDepartmentNavigation)
                    .WithMany(p => p.DepartmentNeeds)
                    .HasForeignKey(d => d.IdDepartment)
                    .HasConstraintName("fk_department_needs_department");
            });

            modelBuilder.Entity<Magasin>(entity =>
            {
                entity.ToTable("magasin");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<MoinsDisant>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("moins_disant");

                entity.Property(e => e.ArticleName)
                    .HasMaxLength(100)
                    .HasColumnName("article_name");

                entity.Property(e => e.DateReceived).HasColumnName("date_received");

                entity.Property(e => e.NeedNumero)
                    .HasMaxLength(100)
                    .HasColumnName("need_numero");

                entity.Property(e => e.ProformaNumero)
                    .HasMaxLength(100)
                    .HasColumnName("proforma_numero");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(100)
                    .HasColumnName("supplier_name");

                entity.Property(e => e.TotalHt).HasColumnName("total_ht");

                entity.Property(e => e.Tva).HasColumnName("tva");

                entity.Property(e => e.UnitPrice).HasColumnName("unit_price");
            });

            modelBuilder.Entity<NeedDetail>(entity =>
            {
                entity.ToTable("need_details");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdDepartmentNeeds).HasColumnName("id_department_needs");

                entity.Property(e => e.Motif)
                    .HasColumnType("character varying")
                    .HasColumnName("motif");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany(p => p.NeedDetails)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("fk_need_details_article");

                entity.HasOne(d => d.IdDepartmentNeedsNavigation)
                    .WithMany(p => p.NeedDetails)
                    .HasForeignKey(d => d.IdDepartmentNeeds)
                    .HasConstraintName("fk_need_details_department_needs");
            });

            modelBuilder.Entity<NeedGroup>(entity =>
            {
                entity.ToTable("need_group");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FinalDateNeed).HasColumnName("final_date_need");

                entity.Property(e => e.IdArticle)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id_article");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany(p => p.NeedGroups)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("fk_need_group_article");
            });

            modelBuilder.Entity<NeedGroupNeed>(entity =>
            {
                entity.ToTable("need_group_need");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdNeedDetails).HasColumnName("id_need_details");

                entity.Property(e => e.IdNeedGroup).HasColumnName("id_need_group");

                entity.HasOne(d => d.IdNeedDetailsNavigation)
                    .WithMany(p => p.NeedGroupNeeds)
                    .HasForeignKey(d => d.IdNeedDetails)
                    .HasConstraintName("fk_need_group_need_need_details");

                entity.HasOne(d => d.IdNeedGroupNavigation)
                    .WithMany(p => p.NeedGroupNeeds)
                    .HasForeignKey(d => d.IdNeedGroup)
                    .HasConstraintName("fk_need_group_need_need_group");
            });

            modelBuilder.Entity<Proforma>(entity =>
            {
                entity.ToTable("proforma");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('proformat_id_seq'::regclass)");

                entity.Property(e => e.DateReceived).HasColumnName("date_received");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.TotalHt).HasColumnName("total_ht");

                entity.Property(e => e.TotalTtc).HasColumnName("total_ttc");

                entity.Property(e => e.TotalTva).HasColumnName("total_tva");

                entity.HasOne(d => d.IdProformaSendNavigation)
                    .WithMany(p => p.Proformas)
                    .HasForeignKey(d => d.IdProformaSend)
                    .HasConstraintName("fk_proforma_proforma_send");
            });

            modelBuilder.Entity<ProformaDetail>(entity =>
            {
                entity.ToTable("proforma_details");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('proformat_details_id_seq'::regclass)");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdNeedGroup).HasColumnName("id_need_group");

                entity.Property(e => e.IdProforma).HasColumnName("id_proforma");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.TotalHt).HasColumnName("total_ht");

                entity.Property(e => e.Tva).HasColumnName("tva");

                entity.Property(e => e.UnitPrice).HasColumnName("unit_price");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany(p => p.ProformaDetails)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("fk_proforma_details_article");

                entity.HasOne(d => d.IdNeedGroupNavigation)
                    .WithMany(p => p.ProformaDetails)
                    .HasForeignKey(d => d.IdNeedGroup)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("fk_proforma_details_need_group");

                entity.HasOne(d => d.IdProformaNavigation)
                    .WithMany(p => p.ProformaDetails)
                    .HasForeignKey(d => d.IdProforma)
                    .HasConstraintName("fk_proforma_details_proforma");
            });

            modelBuilder.Entity<ProformaSend>(entity =>
            {
                entity.ToTable("proforma_send");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.ProformaSends)
                    .HasForeignKey(d => d.IdSupplier)
                    .HasConstraintName("fk_proforma_send_supplier");
            });

            modelBuilder.Entity<ProformaSendNeedGroup>(entity =>
            {
                entity.ToTable("proforma_send_need_group");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('proforma_send_details_id_seq'::regclass)");

                entity.Property(e => e.IdNeedGroup).HasColumnName("id_need_group");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.HasOne(d => d.IdNeedGroupNavigation)
                    .WithMany(p => p.ProformaSendNeedGroups)
                    .HasForeignKey(d => d.IdNeedGroup)
                    .HasConstraintName("fk_proforma_send_details_need_group");

                entity.HasOne(d => d.IdProformaSendNavigation)
                    .WithMany(p => p.ProformaSendNeedGroups)
                    .HasForeignKey(d => d.IdProformaSend)
                    .HasConstraintName("fk_proforma_send_details_proforma_send");
            });

            modelBuilder.Entity<PurchaseOrder>(entity =>
            {
                entity.ToTable("purchase_order");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Discount).HasColumnName("discount");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.ParcelCharges).HasColumnName("parcel_charges");

                entity.Property(e => e.Payment).HasColumnName("payment");

                entity.Property(e => e.Reference)
                    .HasColumnType("character varying")
                    .HasColumnName("reference");

                entity.Property(e => e.SumHt).HasColumnName("sum_ht");

                entity.Property(e => e.SumTtc).HasColumnName("sum_ttc");

                entity.Property(e => e.SumVat).HasColumnName("sum_vat");

                entity.Property(e => e.Validation).HasColumnName("validation");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.PurchaseOrders)
                    .HasForeignKey(d => d.IdSupplier)
                    .HasConstraintName("fk_purchase_order_supplier");
            });

            modelBuilder.Entity<PurchaseOrderDetail>(entity =>
            {
                entity.ToTable("purchase_order_details");

                entity.HasIndex(e => e.IdArticle, "unq_purchase order_details_id_article")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('\"purchase order_details_id_seq\"'::regclass)");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.Description)
                    .HasColumnType("character varying")
                    .HasColumnName("description");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdPurchaseOrder).HasColumnName("id_purchase_order");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SalePrice).HasColumnName("sale_price");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Vat).HasColumnName("vat");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithOne(p => p.PurchaseOrderDetail)
                    .HasForeignKey<PurchaseOrderDetail>(d => d.IdArticle)
                    .HasConstraintName("fk_purchase_order_details_article");

                entity.HasOne(d => d.IdPurchaseOrderNavigation)
                    .WithMany(p => p.PurchaseOrderDetails)
                    .HasForeignKey(d => d.IdPurchaseOrder)
                    .HasConstraintName("fk_purchase_order_details_purchase_order");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToTable("supplier");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("character varying")
                    .HasColumnName("phone_number");
            });

            modelBuilder.Entity<VAccount>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_account");

                entity.Property(e => e.DepartmentName)
                    .HasMaxLength(100)
                    .HasColumnName("department_name");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(100)
                    .HasColumnName("fullname");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Password)
                    .HasColumnType("character varying")
                    .HasColumnName("password");

                entity.Property(e => e.Profil)
                    .HasMaxLength(100)
                    .HasColumnName("profil");
            });

            modelBuilder.Entity<VArticleEmail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_article_email");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Unit)
                    .HasColumnType("character varying")
                    .HasColumnName("unit");
            });

            modelBuilder.Entity<VBesoin>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_besoin");

                entity.Property(e => e.Article)
                    .HasMaxLength(100)
                    .HasColumnName("article");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Department)
                    .HasMaxLength(100)
                    .HasColumnName("department");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdDepartmentNeeds).HasColumnName("id_department_needs");

                entity.Property(e => e.IdNeedDetails).HasColumnName("id_need_details");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Validation).HasColumnName("validation");
            });

            modelBuilder.Entity<VBesoinAAfficher>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_besoin_a_afficher");

                entity.Property(e => e.Article)
                    .HasMaxLength(100)
                    .HasColumnName("article");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Department)
                    .HasMaxLength(100)
                    .HasColumnName("department");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdDepartmentNeeds).HasColumnName("id_department_needs");

                entity.Property(e => e.IdNeedDetails).HasColumnName("id_need_details");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Validation).HasColumnName("validation");
            });

            modelBuilder.Entity<VBesoinAGrouper>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_besoin_a_grouper");

                entity.Property(e => e.Article)
                    .HasMaxLength(100)
                    .HasColumnName("article");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Department)
                    .HasMaxLength(100)
                    .HasColumnName("department");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdDepartmentNeeds).HasColumnName("id_department_needs");

                entity.Property(e => e.IdNeedDetails).HasColumnName("id_need_details");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Validation).HasColumnName("validation");
            });

            modelBuilder.Entity<VBonEntree>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_bon_entree");

                entity.Property(e => e.DateEntree).HasColumnName("date_entree");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdMagasin).HasColumnName("id_magasin");

                entity.Property(e => e.IdRecuPar).HasColumnName("id_recu_par");

                entity.Property(e => e.IdRemisPar).HasColumnName("id_remis_par");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.MagasinName)
                    .HasMaxLength(100)
                    .HasColumnName("magasin_name");

                entity.Property(e => e.RecuParName)
                    .HasMaxLength(100)
                    .HasColumnName("recu_par_name");

                entity.Property(e => e.RemisParName)
                    .HasMaxLength(100)
                    .HasColumnName("remis_par_name");

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(100)
                    .HasColumnName("supplier_name");
            });

            modelBuilder.Entity<VBonEntreeDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_bon_entree_details");

                entity.Property(e => e.ArticleName)
                    .HasMaxLength(100)
                    .HasColumnName("article_name");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdBonEntree).HasColumnName("id_bon_entree");

                entity.Property(e => e.Observation)
                    .HasMaxLength(200)
                    .HasColumnName("observation");

                entity.Property(e => e.Quantite).HasColumnName("quantite");
            });

            modelBuilder.Entity<VBonSortie>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_bon_sortie");

                entity.Property(e => e.DateSortie).HasColumnName("date_sortie");

                entity.Property(e => e.DemandeName)
                    .HasMaxLength(100)
                    .HasColumnName("demande_name");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdDemande).HasColumnName("id_demande");

                entity.Property(e => e.IdMagasin).HasColumnName("id_magasin");

                entity.Property(e => e.IdRemis).HasColumnName("id_remis");

                entity.Property(e => e.MagasinName)
                    .HasMaxLength(100)
                    .HasColumnName("magasin_name");

                entity.Property(e => e.RemisName)
                    .HasMaxLength(100)
                    .HasColumnName("remis_name");
            });

            modelBuilder.Entity<VBonSortieDetial>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_bon_sortie_detials");

                entity.Property(e => e.ArticleName)
                    .HasMaxLength(100)
                    .HasColumnName("article_name");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdBonSortie).HasColumnName("id_bon_sortie");

                entity.Property(e => e.PrixUnitaire).HasColumnName("prix_unitaire");

                entity.Property(e => e.QuantiteDemande).HasColumnName("quantite_demande");

                entity.Property(e => e.QuantiteLivre).HasColumnName("quantite_livre");

                entity.Property(e => e.Total).HasColumnName("total");
            });

            modelBuilder.Entity<VGroupNonProformer>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_group_non_proformer");

                entity.Property(e => e.Article)
                    .HasMaxLength(100)
                    .HasColumnName("article");

                entity.Property(e => e.FinalDateNeed).HasColumnName("final_date_need");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.Quantity).HasColumnName("quantity");
            });

            modelBuilder.Entity<VGroupProformer>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_group_proformer");

                entity.Property(e => e.Article)
                    .HasMaxLength(100)
                    .HasColumnName("article");

                entity.Property(e => e.FinalDateNeed).HasColumnName("final_date_need");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.Quantity).HasColumnName("quantity");
            });

            modelBuilder.Entity<VGroupProformerDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_group_proformer_details");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.Supplier)
                    .HasMaxLength(100)
                    .HasColumnName("supplier");
            });

            modelBuilder.Entity<VProforma>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_proforma");

                entity.Property(e => e.DateReceived).HasColumnName("date_received");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.NumeroSend)
                    .HasMaxLength(100)
                    .HasColumnName("numero_send");

                entity.Property(e => e.Supplier)
                    .HasMaxLength(100)
                    .HasColumnName("supplier");

                entity.Property(e => e.TotalHt).HasColumnName("total_ht");

                entity.Property(e => e.TotalTtc).HasColumnName("total_ttc");

                entity.Property(e => e.TotalTva).HasColumnName("total_tva");
            });

            modelBuilder.Entity<VProformaDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_proforma_details");

                entity.Property(e => e.ArticleName)
                    .HasMaxLength(100)
                    .HasColumnName("article_name");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdNeedGroup).HasColumnName("id_need_group");

                entity.Property(e => e.IdProforma).HasColumnName("id_proforma");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.TotalHt).HasColumnName("total_ht");

                entity.Property(e => e.Tva).HasColumnName("tva");

                entity.Property(e => e.Unit)
                    .HasColumnType("character varying")
                    .HasColumnName("unit");

                entity.Property(e => e.UnitPrice).HasColumnName("unit_price");
            });

            modelBuilder.Entity<VProformaSend>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_proforma_send");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("character varying")
                    .HasColumnName("phone_number");
            });

            modelBuilder.Entity<VProformaSendNeedGroup>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_proforma_send_need_group");

                entity.Property(e => e.ArticleName)
                    .HasMaxLength(100)
                    .HasColumnName("article_name");

                entity.Property(e => e.ArticleUnit)
                    .HasColumnType("character varying")
                    .HasColumnName("article_unit");

                entity.Property(e => e.FinalDateNeed).HasColumnName("final_date_need");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdNeedGroup).HasColumnName("id_need_group");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.Property(e => e.Numero)
                    .HasMaxLength(100)
                    .HasColumnName("numero");

                entity.Property(e => e.Quantity).HasColumnName("quantity");
            });

            modelBuilder.HasSequence("account_id_seq");

            modelBuilder.HasSequence("article_id_seq");

            modelBuilder.HasSequence("article_supplier_id_seq");

            modelBuilder.HasSequence("department_id_seq");

            modelBuilder.HasSequence("department_needs_id_seq");

            modelBuilder.HasSequence("need_details_id_seq");

            modelBuilder.HasSequence("proforma_send_details_id_seq");

            modelBuilder.HasSequence("proforma_send_id_seq");

            modelBuilder.HasSequence("proformat_details_id_seq");

            modelBuilder.HasSequence("proformat_id_seq");

            modelBuilder.HasSequence("purchase order_details_id_seq");

            modelBuilder.HasSequence("purchase_order_id_seq");

            modelBuilder.HasSequence("supplier_id_seq");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
