using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicLibrary.Models;

namespace MusicLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly MusicLibraryContext _context;

        public AlbumsController(MusicLibraryContext context)
        {
            _context = context;
        }

        // GET: api/Albums
        [HttpGet]
        public IEnumerable<Albums> GetAlbums()
        {
            var albums = _context
                .Albums
                .Include(i => i.Artists);
            return albums;
        }

        // GET: api/Albums/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbums([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albums = await _context.Albums.FindAsync(id);

            if (albums == null)
            {
                return NotFound();
            }

            return Ok(albums);
        }

        // PUT: api/Albums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbums([FromRoute] int id, [FromBody] Albums albums)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != albums.Id)
            {
                return BadRequest();
            }

            var albumToUpdate = await _context.Albums.FindAsync(id);
            albumToUpdate.Title = !string.IsNullOrEmpty(albums.Title) ? albums.Title : albumToUpdate.Title;
            albumToUpdate.Year = !string.IsNullOrEmpty(albums.Year) ? albums.Year : albumToUpdate.Year;
            albumToUpdate.Genre = !string.IsNullOrEmpty(albums.Genre) ? albums.Genre : albumToUpdate.Genre;
            albumToUpdate.CoverUrl = !string.IsNullOrEmpty(albums.CoverUrl) ? albums.CoverUrl : albumToUpdate.CoverUrl;

            _context.Entry(albumToUpdate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Albums
        [HttpPost]
        public async Task<IActionResult> PostAlbums([FromBody] Albums albums)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Albums.Add(albums);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlbums", new { id = albums.Id }, albums);
        }

        // DELETE: api/Albums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbums([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albums = await _context.Albums.FindAsync(id);
            if (albums == null)
            {
                return NotFound();
            }

            _context.Albums.Remove(albums);
            await _context.SaveChangesAsync();

            return Ok(albums);
        }

        private bool AlbumsExists(int id)
        {
            return _context.Albums.Any(e => e.Id == id);
        }
    }
}