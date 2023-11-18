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
        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<DepartmentNeed> DepartmentNeeds { get; set; } = null!;
        public virtual DbSet<NeedDetail> NeedDetails { get; set; } = null!;
        public virtual DbSet<Proforma> Proformas { get; set; } = null!;
        public virtual DbSet<ProformaDetail> ProformaDetails { get; set; } = null!;
        public virtual DbSet<ProformaSend> ProformaSends { get; set; } = null!;
        public virtual DbSet<ProformaSendDetail> ProformaSendDetails { get; set; } = null!;
        public virtual DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
        public virtual DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;

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

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Password)
                    .HasColumnType("character varying")
                    .HasColumnName("password");

                entity.Property(e => e.Profil).HasColumnName("profil");

                entity.HasOne(d => d.IdDepartmentNavigation)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.IdDepartment)
                    .HasConstraintName("fk_account_department");
            });

            modelBuilder.Entity<Article>(entity =>
            {
                entity.ToTable("article");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Unit)
                    .HasColumnType("character varying")
                    .HasColumnName("unit");

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.Article)
                    .HasPrincipalKey<NeedDetail>(p => p.IdArticle)
                    .HasForeignKey<Article>(d => d.Id)
                    .HasConstraintName("fk_article_need_details");
            });

            modelBuilder.Entity<ArticleSupplier>(entity =>
            {
                entity.ToTable("article_supplier");

                entity.HasIndex(e => e.IdArticle, "unq_article_supplier_id_article")
                    .IsUnique();

                entity.HasIndex(e => e.IdSupplier, "unq_article_supplier_id_supplier")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithOne(p => p.ArticleSupplier)
                    .HasForeignKey<ArticleSupplier>(d => d.IdArticle)
                    .HasConstraintName("fk_article_supplier_article");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithOne(p => p.ArticleSupplier)
                    .HasForeignKey<ArticleSupplier>(d => d.IdSupplier)
                    .HasConstraintName("fk_article_supplier_supplier");
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

                entity.HasIndex(e => e.IdDepartment, "unq_department_needs_id_department")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Validation).HasColumnName("validation");

                entity.HasOne(d => d.IdDepartmentNavigation)
                    .WithOne(p => p.DepartmentNeed)
                    .HasForeignKey<DepartmentNeed>(d => d.IdDepartment)
                    .HasConstraintName("fk_department_needs_department");
            });

            modelBuilder.Entity<NeedDetail>(entity =>
            {
                entity.ToTable("need_details");

                entity.HasIndex(e => e.IdArticle, "unq_need_details_id_article")
                    .IsUnique();

                entity.HasIndex(e => e.IdDepartmentNeeds, "unq_need_details_id_department_needs")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdDepartmentNeeds).HasColumnName("id_department_needs");

                entity.Property(e => e.Motif)
                    .HasColumnType("character varying")
                    .HasColumnName("motif");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdDepartmentNeedsNavigation)
                    .WithOne(p => p.NeedDetail)
                    .HasForeignKey<NeedDetail>(d => d.IdDepartmentNeeds)
                    .HasConstraintName("fk_need_details_department_needs");
            });

            modelBuilder.Entity<Proforma>(entity =>
            {
                entity.ToTable("proforma");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('proformat_id_seq'::regclass)");

                entity.Property(e => e.DateReceived).HasColumnName("date_received");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.Property(e => e.TotalPrice).HasColumnName("total_price");

                entity.HasOne(d => d.IdProformaSendNavigation)
                    .WithMany(p => p.Proformas)
                    .HasForeignKey(d => d.IdProformaSend)
                    .HasConstraintName("fk_proforma_proforma_send");
            });

            modelBuilder.Entity<ProformaDetail>(entity =>
            {
                entity.ToTable("proforma_details");

                entity.HasIndex(e => e.IdArticle, "unq_proforma_details_id_article")
                    .IsUnique();

                entity.HasIndex(e => e.IdProforma, "unq_proforma_details_id_proforma")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('proformat_details_id_seq'::regclass)");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdProforma).HasColumnName("id_proforma");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SalePrice).HasColumnName("sale_price");

                entity.Property(e => e.TotalPrice).HasColumnName("total_price");

                entity.Property(e => e.Tva).HasColumnName("tva");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithOne(p => p.ProformaDetail)
                    .HasForeignKey<ProformaDetail>(d => d.IdArticle)
                    .HasConstraintName("fk_proforma_details_article");

                entity.HasOne(d => d.IdProformaNavigation)
                    .WithOne(p => p.ProformaDetail)
                    .HasForeignKey<ProformaDetail>(d => d.IdProforma)
                    .HasConstraintName("fk_proforma_details_proforma");
            });

            modelBuilder.Entity<ProformaSend>(entity =>
            {
                entity.ToTable("proforma_send");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.ProformaSends)
                    .HasForeignKey(d => d.IdSupplier)
                    .HasConstraintName("fk_proforma_send_supplier");
            });

            modelBuilder.Entity<ProformaSendDetail>(entity =>
            {
                entity.ToTable("proforma_send_details");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdProformaSendNavigation)
                    .WithMany(p => p.ProformaSendDetails)
                    .HasForeignKey(d => d.IdProformaSend)
                    .HasConstraintName("fk_proforma_send_details_proforma_send");
            });

            modelBuilder.Entity<PurchaseOrder>(entity =>
            {
                entity.ToTable("purchase_order");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateSend).HasColumnName("date_send");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.Validation).HasColumnName("validation");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.PurchaseOrders)
                    .HasForeignKey(d => d.IdSupplier)
                    .HasConstraintName("fk_purchase_order_supplier");
            });

            modelBuilder.Entity<PurchaseOrderDetail>(entity =>
            {
                entity.ToTable("purchase order_details");

                entity.HasIndex(e => e.IdArticle, "unq_purchase order_details_id_article")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdPurchaseOrder).HasColumnName("id_purchase order");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithOne(p => p.PurchaseOrderDetail)
                    .HasForeignKey<PurchaseOrderDetail>(d => d.IdArticle)
                    .HasConstraintName("fk_purchase order_details_article");

                entity.HasOne(d => d.IdPurchaseOrderNavigation)
                    .WithMany(p => p.PurchaseOrderDetails)
                    .HasForeignKey(d => d.IdPurchaseOrder)
                    .HasConstraintName("fk_purchase order_details_purchase_order");
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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
