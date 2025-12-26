import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'assetCategory',
    title: 'Asset Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

    ],
    hidden: ({ currentUser }) => {
        // If no user (edge case), hide it
        if (!currentUser) return true

        // Extract role names
        const roles = currentUser.roles.map(role => role.name)

        // Show ONLY to administrators
        return !roles.includes('administrator')
    },
})
