using System;
using System.Collections.Generic;

namespace MusicLibrary.Models
{
    public partial class AlbumsArtists
    {
        public int AlbumId { get; set; }
        public int ArtistId { get; set; }

        public Albums Album { get; set; }
        public Artists Artist { get; set; }
    }
}
