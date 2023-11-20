﻿using System;
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
        public virtual DbSet<NeedGroup> NeedGroups { get; set; } = null!;
        public virtual DbSet<NeedGroupNeed> NeedGroupNeeds { get; set; } = null!;
        public virtual DbSet<NeedGroupProformaSend> NeedGroupProformaSends { get; set; } = null!;
        public virtual DbSet<Proforma> Proformas { get; set; } = null!;
        public virtual DbSet<ProformaDetail> ProformaDetails { get; set; } = null!;
        public virtual DbSet<ProformaSend> ProformaSends { get; set; } = null!;
        public virtual DbSet<ProformaSendDetail> ProformaSendDetails { get; set; } = null!;
        public virtual DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
        public virtual DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<VBesoin> VBesoins { get; set; } = null!;
        public virtual DbSet<VBesoinAGrouper> VBesoinAGroupers { get; set; } = null!;
        public virtual DbSet<VGroupNonProformer> VGroupNonProformers { get; set; } = null!;

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

            modelBuilder.Entity<NeedGroupProformaSend>(entity =>
            {
                entity.ToTable("need_group_proforma_send");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdNeedGroup).HasColumnName("id_need_group");

                entity.Property(e => e.IdProformaSend).HasColumnName("id_proforma_send");

                entity.HasOne(d => d.IdNeedGroupNavigation)
                    .WithMany(p => p.NeedGroupProformaSends)
                    .HasForeignKey(d => d.IdNeedGroup)
                    .HasConstraintName("fk_need_group_proforma_need_group");

                entity.HasOne(d => d.IdProformaSendNavigation)
                    .WithMany(p => p.NeedGroupProformaSends)
                    .HasForeignKey(d => d.IdProformaSend)
                    .HasConstraintName("fk_need_group_proforma_send_proforma_send");
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
                    .WithMany(p => p.ProformaDetails)
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("fk_proforma_details_article");

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

                entity.Property(e => e.Discount).HasColumnName("discount");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.ParcelCharges).HasColumnName("parcel_charges");

                entity.Property(e => e.Payment).HasColumnName("payment");

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
                entity.HasNoKey();

                entity.ToTable("purchase order_details");

                entity.Property(e => e.DateNeed).HasColumnName("date_need");

                entity.Property(e => e.Description)
                    .HasColumnType("character varying")
                    .HasColumnName("description");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("nextval('purchase_order_details_id_seq'::regclass)");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

                entity.Property(e => e.IdPurchaseOrder).HasColumnName("id_purchase order");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SalePrice).HasColumnName("sale_price");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Vat).HasColumnName("vat");

                entity.HasOne(d => d.IdArticleNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdArticle)
                    .HasConstraintName("fk_purchase order_details_article");

                entity.HasOne(d => d.IdPurchaseOrderNavigation)
                    .WithMany()
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

            modelBuilder.Entity<VGroupNonProformer>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("v_group_non_proformer");

                entity.Property(e => e.FinalDateNeed).HasColumnName("final_date_need");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticle).HasColumnName("id_article");

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

            modelBuilder.HasSequence("purchase_order_details_id_seq");

            modelBuilder.HasSequence("purchase_order_id_seq");

            modelBuilder.HasSequence("supplier_id_seq");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}