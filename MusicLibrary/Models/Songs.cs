using System;
using System.Collections.Generic;

namespace MusicLibrary.Models
{
    public partial class Songs
    {
        public Songs()
        {
            AlbumsSongs = new HashSet<AlbumsSongs>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Length { get; set; }

        public ICollection<AlbumsSongs> AlbumsSongs { get; set; }
    }
}
