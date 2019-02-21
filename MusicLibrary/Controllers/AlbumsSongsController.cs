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
    public class AlbumsSongsController : ControllerBase
    {
        private readonly MusicLibraryContext _context;

        public AlbumsSongsController(MusicLibraryContext context)
        {
            _context = context;
        }

        // GET: api/AlbumsSongs
        [HttpGet]
        public IEnumerable<AlbumsSongs> GetAlbumsSongs()
        {
            return _context.AlbumsSongs;
        }

        // GET: api/AlbumsSongs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbumsSongs([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albumsSongs = await _context.AlbumsSongs.FindAsync(id);

            if (albumsSongs == null)
            {
                return NotFound();
            }

            return Ok(albumsSongs);
        }

        // PUT: api/AlbumsSongs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbumsSongs([FromRoute] int id, [FromBody] AlbumsSongs albumsSongs)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != albumsSongs.AlbumId)
            {
                return BadRequest();
            }

            _context.Entry(albumsSongs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumsSongsExists(id))
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

        // POST: api/AlbumsSongs
        [HttpPost]
        public async Task<IActionResult> PostAlbumsSongs([FromBody] AlbumsSongs albumsSongs)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.AlbumsSongs.Add(albumsSongs);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AlbumsSongsExists(albumsSongs.AlbumId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAlbumsSongs", new { id = albumsSongs.AlbumId }, albumsSongs);
        }

        // DELETE: api/AlbumsSongs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbumsSongs([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albumsSongs = await _context.AlbumsSongs.FindAsync(id);
            if (albumsSongs == null)
            {
                return NotFound();
            }

            _context.AlbumsSongs.Remove(albumsSongs);
            await _context.SaveChangesAsync();

            return Ok(albumsSongs);
        }

        private bool AlbumsSongsExists(int id)
        {
            return _context.AlbumsSongs.Any(e => e.AlbumId == id);
        }
    }
}