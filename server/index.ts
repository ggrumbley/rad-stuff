import { objectType, enumType, makeSchema, stringArg } from '@nexus/schema';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('name');
    t.string('password');
    t.string('resetToken', { nullable: true });
    t.float('resetTokenExpiry', { nullable: true });
    t.field('permissions', { type: 'PermissionsEnum' });
  },
});

const Item = objectType({
  name: 'Item',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('description');
    t.string('image', { nullable: true });
    t.string('largeImage', { nullable: true });
    t.int('price');
    t.field('user', {
      type: 'User',
      resolve: (parent) =>
        prisma.item
          .findOne({
            where: { id: Number(parent.id) },
          })
          .user(),
    });
  },
});

const PermissionsEnum = enumType({
  name: 'PermissionsEnum',
  members: [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
  ],
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('items', {
      type: 'Item',
      resolve: async (_parent, _args, _ctx) => await prisma.item.findMany(),
    });

    // t.list.field('users', {
    //   type: 'User',
    //   resolve: (_parent, _args, _ctx) => prisma.user.findMany(),
    // });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, args, _ctx) => {
        return await prisma.user.create({
          data: {
            ...args,
            email: args.email.toLowerCase(),
            permissions: { set: ['USER'] },
          },
        });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User, Item, PermissionsEnum],
  outputs: {
    typegen: path.join(process.cwd(), 'server', 'schema', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'server', 'schema', 'schema.graphql'),
  },
});
