using System;
using System.Collections.Generic;

namespace MusicLibrary.Models
{
    public partial class Artists
    {
        public Artists()
        {
            AlbumsArtists = new HashSet<AlbumsArtists>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public ICollection<AlbumsArtists> AlbumsArtists { get; set; }
    }
}
