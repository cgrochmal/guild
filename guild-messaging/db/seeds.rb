# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Set up default users
User.create([
    {username: 'chris'},
    {username: 'interviewer1'},
    {username: 'interviewer2'}
])

# chris = User.where(username: 'chris')
# i1 = User.where(username: 'interviewer1', body: body)
body = 'Welcome to my simple chat app! If you have any questions, please do not hesitate to reach out to me at cgrochmal@gmail.com. I would love the opportunity to discuss some of the design decisions I made with you all!'
Message.create([
    {from_user_id: User.where(username: 'chris').first.id, to_user_id: User.where(username: 'interviewer1').first.id, body: body},
    {from_user_id: User.where(username: 'chris').first.id, to_user_id: User.where(username: 'interviewer2').first.id, body: body}
])

