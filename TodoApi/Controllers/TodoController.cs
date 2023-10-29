using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
    }
}

