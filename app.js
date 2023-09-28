const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data.db',
  },
  useNullAsDefault: true,
});

app.use(bodyParser.json())

app.get('/api/boardgames', async (req, res) => {
  const selectedRows = await knex('boardgames')
  .select('*')

  console.log('[API] Requested ' + selectedRows.length + ' boardgames')
  res.send(selectedRows)
})

app.post('/api/boardgames', async (req, res) => {
  const {name, owner, bggUrl: bgg_url, lentTo: lent_to} = req.body || {}

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
