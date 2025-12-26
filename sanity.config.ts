import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'




// sanity.config.ts
export default defineConfig([
 {
  name: 'default',
  title: 'sanity-testing',
  basePath:'/producto',
  projectId: 'kvfk2g47',
  dataset: 'production',
  plugins: [structureTool({
    structure: (S, context) => {
      const roles = context.currentUser?.roles.map(r => r.name) ?? []
      const isAdmin = roles.includes('administrator')

      return S.list()
        .title('Content')
        .items([
          S.documentTypeListItem('post'),
          S.documentTypeListItem('author'),
          S.documentTypeListItem('category'),

          // Only admins see Asset Category
          ...(isAdmin
            ? [S.documentTypeListItem('assetCategory')]
            : []),
        ])
    }
  }), visionTool()],

  schema: {
    types: schemaTypes,
  }

},
  {
    name: 'admin-workspace',
    title: 'Admin Panel',
    basePath: '/admin',
    projectId: 'your-project-id',
    dataset: 'admin-db',
    // schema: { types: adminSchemaTypes }, // Only user-related schemas
  }
])