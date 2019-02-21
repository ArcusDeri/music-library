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
    public class AlbumsArtistsController : ControllerBase
    {
        private readonly MusicLibraryContext _context;

        public AlbumsArtistsController(MusicLibraryContext context)
        {
            _context = context;
        }

        // GET: api/AlbumsArtists
        [HttpGet]
        public IEnumerable<AlbumsArtists> GetAlbumsArtists()
        {
            return _context.AlbumsArtists;
        }

        // GET: api/AlbumsArtists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbumsArtists([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albumsArtists = await _context.AlbumsArtists.FindAsync(id);

            if (albumsArtists == null)
            {
                return NotFound();
            }

            return Ok(albumsArtists);
        }

        // PUT: api/AlbumsArtists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbumsArtists([FromRoute] int id, [FromBody] AlbumsArtists albumsArtists)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != albumsArtists.AlbumId)
            {
                return BadRequest();
            }

            _context.Entry(albumsArtists).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumsArtistsExists(id))
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

        // POST: api/AlbumsArtists
        [HttpPost]
        public async Task<IActionResult> PostAlbumsArtists([FromBody] AlbumsArtists albumsArtists)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.AlbumsArtists.Add(albumsArtists);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AlbumsArtistsExists(albumsArtists.AlbumId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAlbumsArtists", new { id = albumsArtists.AlbumId }, albumsArtists);
        }

        // DELETE: api/AlbumsArtists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbumsArtists([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albumsArtists = await _context.AlbumsArtists.FindAsync(id);
            if (albumsArtists == null)
            {
                return NotFound();
            }

            _context.AlbumsArtists.Remove(albumsArtists);
            await _context.SaveChangesAsync();

            return Ok(albumsArtists);
        }

        private bool AlbumsArtistsExists(int id)
        {
            return _context.AlbumsArtists.Any(e => e.AlbumId == id);
        }
    }
}