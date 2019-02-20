using System;
using System.Collections.Generic;

namespace MusicLibrary.Models
{
    public partial class Albums
    {
        public Albums()
        {
            AlbumsArtists = new HashSet<AlbumsArtists>();
            AlbumsSongs = new HashSet<AlbumsSongs>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
        public string Genre { get; set; }
        public string CoverUrl { get; set; }

        public ICollection<AlbumsArtists> AlbumsArtists { get; set; }
        public ICollection<AlbumsSongs> AlbumsSongs { get; set; }
    }
}
