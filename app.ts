import express = require('express');
const app = express()
import bodyParser = require('body-parser');
import path from "path";
const port = process.env.PORT || 8080

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './databases/data.db',
  },
  useNullAsDefault: true,
});

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'www')));

app.get('/api/boardgames', async (req, res) => {
  const selectedRows = await knex('boardgames')
  .select('*')

  console.log('[API] Requested ' + selectedRows.length + ' boardgames')
  res.send(selectedRows)
})

app.post('/api/boardgames', async (req, res) => {
  const {name, owner, bgg_url, lent_to} = req.body || {}

  // mandatory props
  if (name && owner) {
    const line = (await knex('boardgames').insert({
      name,
      owner,
      bgg_url,
      lent_to
    }).returning('id'))[0]
    console.log('[API] Inserting 1 line into boardgames')
    res.send(line)
  } else {
    res.status(400)
    console.error('[API] Body misses one of the mandatory properties: "name" or "owner"')
    res.json({error: 'body misses one of the mandatory properties: "name" or "owner"'})
  }
})

app.patch('/api/boardgames/:id', async (req, res) => {
  const id = req.params.id
  const line = await knex('boardgames').where('id', id).first()

  if (!line) {
    res.status(404)
    res.json({error: 'Boardgame with id ' + id + ' not found'})
  } else {
    await knex('boardgames').where('id', id).update(req.body)
    console.log('[API] Updating 1 line')
    res.send({id})
  }

})


// WEB SERVER
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

app.get('*', function(req, res) {
  res.status(404)
  res.json({error: 'Not found'});
});
app.post('*', function(req, res) {
  res.status(404)
  res.json({error: 'Not found'});
});
app.patch('*', function(req, res) {
  res.status(404)
  res.json({error: 'Not found'});
});


app.listen(port, async () => {
  try {
    if (!await knex.schema.hasTable('boardgames')) {
      // Create a table
      await knex.schema
        .createTable('boardgames', (table) => {
          table.increments('id');
          table.string('name')
          table.string('bgg_url');
          table.string('owner');
          table.string('lent_to');
        })
    }

    // Finally, add a catch statement
  } catch (e) {
    console.error(e);
  }
  console.log(`Example app listening on port ${port}`)
})
