// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table user_type {
  id integer
  name varchar
  feature_permission_id integer
  created_at timestamp
}

Table users {
  id integer [primary key]
  username varchar
  name varchar
  email varchar
  password varchar
  user_type varchar
  created_at timestamp
}

Table EmailChange {
  id number [primary key]
  user_id number
  token string
  otp number
  otp_time Date
  old_email string
  new_email string
  valid number
  created_on Date
}

Table features {
  id integer [primary key]
  sub_feature_id integer
  name varchar
  description varchar
  valid boolean
  timestamp timestamp
}

Table permission{
  id intger [primary key]
  name varchar
  description varchar
  valid boolean
}

Table feature_permission{
  id intger [primary key]
  feature_id int
  permission_id int
  valid boolean
}

Ref: features.id  < feature_permission.feature_id
Ref: features.id  < features.sub_feature_id
Ref: permission.id < feature_permission.permission_id
Ref: user_type.feature_permission_id > feature_permission.id
Ref: users.user_type > user_type.id

Table category{
  id int [primary key]
  sub_category_is int
  name varchar
  description text
  image varchar
  valid boolean
  is_publish boolean
  created_by int
  updated_by int
  created_at date
  updated_at date
}

Table tag{
  id int [primary key]
  name varchar
  created_by int
  updated_by int
  created_at date
  updated_at date
}

Table blog{
  id int [primary key]
  category_id int
  title varchar
  content varchar
  image varchar
  image_title varchar
  valid booolean
  is_publish boolean
  created_by int
  updated_by int
  created_at date
  updated_at date
}
Table BlogTag {
  id number
  blog_id number
  tag_id number
  created_on Date
  updated_on Date
}
Table Paragraph {
   id number [primary key]
   blog_id number
   content string
   order number
   valid boolean
   created_on Date
   updated_on Date
}
Table ParagraphImage {
   id number [primary key]
   paragraph_id number
   image_url string
   title string
   description string
   valid boolean
   created_on Date
   updated_on Date
}
Table profile{
  id int [primary key]
  user_id int 
  description text
  avatar varchar
  created_by int
  updated_by int
  created_at date
  updated_at date
}
Table social_link {
  id int [primary key]
  author_id int
  social_id int
  url varchar
  valid boolean
  created_by int
  updated_by int
  created_at date
  updated_at date
}
Table social_media{
  id int [primary key]
  name varchar
  url varchar
  updated_by int
  created_by int
  created_at date
  updated_at date
}
Table webstories{
  id int [primary key]
  name varchar
  slug varchar
  insta_link varchar
  is_publish boolean
  valid boolean 
  created_by int
  updated_by int
  created_at date
  updated_at date
}


Ref: "blog"."id" < "BlogTag"."blog_id"

Ref: "blog"."id" < "Paragraph"."blog_id"

Ref: "users"."id" < "profile"."user_id"

Ref: "social_media"."id" < "social_link"."social_id"

Ref: "users"."id" < "social_link"."author_id"

Ref: "category"."id" < "category"."sub_category_is"

Ref: "category"."id" < "blog"."category_id"

Ref: "Paragraph"."id" < "ParagraphImage"."paragraph_id"

Ref: "users"."id" < "EmailChange"."user_id"

Ref: "tag"."id" < "BlogTag"."tag_id"
