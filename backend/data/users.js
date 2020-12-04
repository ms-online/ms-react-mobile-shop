import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Summer',
    email: 'summer@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Henry',
    email: 'henry@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
