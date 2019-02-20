using System;
using System.Collections.Generic;

namespace MusicLibrary.Models
{
    public partial class AlbumsSongs
    {
        public int AlbumId { get; set; }
        public int SongId { get; set; }

        public Albums Album { get; set; }
        public Songs Song { get; set; }
    }
}
