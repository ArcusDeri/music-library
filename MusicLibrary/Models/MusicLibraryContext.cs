using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MusicLibrary.Models
{
    public partial class MusicLibraryContext : DbContext
    {
        public MusicLibraryContext()
        {
        }

        public MusicLibraryContext(DbContextOptions<MusicLibraryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Albums> Albums { get; set; }
        public virtual DbSet<AlbumsArtists> AlbumsArtists { get; set; }
        public virtual DbSet<AlbumsSongs> AlbumsSongs { get; set; }
        public virtual DbSet<Artists> Artists { get; set; }
        public virtual DbSet<Songs> Songs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder
                    .UseSqlServer("Server=.\\SQLEXPRESS01;Database=MusicLibrary;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Albums>(entity =>
            {
                entity.Property(e => e.CoverUrl)
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')");

                entity.Property(e => e.Genre)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Year)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AlbumsArtists>(entity =>
            {
                entity.HasKey(e => new { e.AlbumId, e.ArtistId });

                entity.ToTable("Albums_Artists");

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.AlbumsArtists)
                    .HasForeignKey(d => d.AlbumId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Albums_Ar__Album__412EB0B6");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.AlbumsArtists)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Albums_Ar__Artis__4222D4EF");
            });

            modelBuilder.Entity<AlbumsSongs>(entity =>
            {
                entity.HasKey(e => new { e.AlbumId, e.SongId });

                entity.ToTable("Albums_Songs");

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.AlbumsSongs)
                    .HasForeignKey(d => d.AlbumId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Albums_So__Album__440B1D61");

                entity.HasOne(d => d.Song)
                    .WithMany(p => p.AlbumsSongs)
                    .HasForeignKey(d => d.SongId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Albums_So__SongI__44FF419A");
            });

            modelBuilder.Entity<Artists>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Songs>(entity =>
            {
                entity.Property(e => e.Length)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
