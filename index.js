require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true  
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
  },  {  
    sequelize,
    underscored: true,
    timestamps: false,  
    modelName: 'blog'
  })

Blog.sync()


app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  console.log(req.body)
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const removeBlog = await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    if (removeBlog) {
      return res.json({ message: `Blog with id ${req.params.id} was deleted` });
    } else {
      return res.status(404).json({ message: "Could not find blog" });
    }
  } catch (error) {
    console.log(error)
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})