import BlogModel from './t_blog';
import CategoryModel from './t_category';
import TagModel from './t_tag';
import ParagraphModel from './t_paragraph';
import ParagraphImageModel from './t_paragraph_image';
import BlogTagModel from './t_blog_tag';

// Define associations
export function setupAssociations() {
  // Blog belongs to a Category
  BlogModel.belongsTo(CategoryModel, {
    foreignKey: 'category_id',
    as: 'category'
  });

  // Category has many Blogs
  CategoryModel.hasMany(BlogModel, {
    foreignKey: 'category_id',
    as: 'blogs'
  });

  // Blog has many Paragraphs
  BlogModel.hasMany(ParagraphModel, {
    foreignKey: 'blog_id',
    as: 'paragraphs'
  });

  // Paragraph belongs to a Blog
  ParagraphModel.belongsTo(BlogModel, {
    foreignKey: 'blog_id',
    as: 'blog'
  });

  // Paragraph has one ParagraphImage
  ParagraphModel.hasOne(ParagraphImageModel, {
    foreignKey: 'paragraph_id',
    as: 'image'
  });

  // ParagraphImage belongs to a Paragraph
  ParagraphImageModel.belongsTo(ParagraphModel, {
    foreignKey: 'paragraph_id',
    as: 'paragraph'
  });

  // Blog has many BlogTag junction records
  BlogModel.hasMany(BlogTagModel, {
    foreignKey: 'blog_id',
    as: 'blogTags'
  });

  // Tag has many BlogTag junction records
  TagModel.hasMany(BlogTagModel, {
    foreignKey: 'tag_id',
    as: 'blogTags'
  });

  // BlogTag belongs to Blog
  BlogTagModel.belongsTo(BlogModel, {
    foreignKey: 'blog_id',
    as: 'blog'
  });

  // BlogTag belongs to Tag
  BlogTagModel.belongsTo(TagModel, {
    foreignKey: 'tag_id',
    as: 'tag'
  });

  // Blog belongsToMany Tags through BlogTag
  BlogModel.belongsToMany(TagModel, {
    through: BlogTagModel,
    foreignKey: 'blog_id',
    otherKey: 'tag_id',
    as: 'tags'
  });

  // Tag belongsToMany Blogs through BlogTag
  TagModel.belongsToMany(BlogModel, {
    through: BlogTagModel,
    foreignKey: 'tag_id',
    otherKey: 'blog_id',
    as: 'blogs'
  });
}