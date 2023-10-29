using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private static readonly List<Todo> Todos = new List<Todo>
        {
            new Todo { Id = 1, Text = "Learn React" },
            new Todo { Id = 2, Text = "Build a To-Do App" },
            new Todo { Id = 3, Text = "C# App" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> GetTodos()
        {
            return Ok(Todos);
        }

        [HttpPost]
        public ActionResult<Todo> CreateTodo([FromBody]Todo todo)
        {
          todo.Id = Todos.Count + 1;
          Todos.Add(todo);
          return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, [FromBody] Todo todo)
        {
          var existingTodo = Todos.FirstOrDefault(t => t.Id == id);

           if (existingTodo == null)
        {
            return NotFound();
        }

           existingTodo.Text = todo.Text;

            return NoContent();
        }
       
       [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
         var todo = Todos.FirstOrDefault(t => t.Id == id);

         if (todo == null)
         {
         return NotFound();
         }

          Todos.Remove(todo);

         return NoContent();
        }

    }
}

