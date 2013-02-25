module Jekyll

  class CategoryIndex < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = category.downcase.sub(" ", "-") + '.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category_index.html')
      self.data['category'] = category

      category_title_prefix = site.config['category_title_prefix'] || ''
      category_title_suffix = site.config['category_title_suffix'] || ' category'
      self.data['title'] = "#{category_title_prefix}#{category}#{category_title_suffix}"
    end
  end

  class CategoryList < Page
    def initialize(site,  base, dir, categories)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category_list.html')
      self.data['categories'] = categories
    end
  end

  class CategoryGenerator < Generator
    safe true
    
    def generate(site)
      if site.layouts.key? 'category_index'
        dir = site.config['category_dir'] || 'categories'
        site.categories.keys.each do |category|
          write_category_index(site, dir, category)
        end
      end

      if site.layouts.key? 'category_list'
        dir = site.config['category_dir'] || 'categories'
        write_category_list(site, dir, site.categories.keys.sort)
      end
    end
  
    def write_category_index(site, dir, category)
      index = CategoryIndex.new(site, site.source, dir, category)
      site.pages << index
    end

    def write_category_list(site, dir, categories)
      index = CategoryList.new(site, site.source, dir, categories)
      site.pages << index
    end
  end

end
