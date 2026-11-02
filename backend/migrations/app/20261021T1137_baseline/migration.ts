#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6492e103304b3ab78e2911af09998ff6b60133f5bd2837d368df733d3fd49ec7/contract';
import endContract from '../../snapshots/6492e103304b3ab78e2911af09998ff6b60133f5bd2837d368df733d3fd49ec7/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'organization',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('country', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('legalName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('ownerId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('postalCode', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('website', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'organization_status_check_a34ffd8e',
            "\"status\" IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'organizationMembership',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('joinedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('leftAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('organizationId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'permission',
        columns: [
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('createdById', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'projectRequest',
        columns: [
          col('archivedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('assignedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('budgetMax', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('budgetMin', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('cancelledAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('category', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('clientId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('currency', 'text', { default: lit('MAD'), codecRef: { codecId: 'pg/text@1' } }),
          col('deadline', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('deliverables', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('documents', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isConfidential', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('organizationId', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('providerId', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('publicationVersion', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('publishedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('requirements', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('startDate', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('subcategory', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('submittedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'projectRequest_status_check_3a0c278b',
            "\"status\" IN ('DRAFT', 'SUBMITTED', 'IN_QUALIFICATION', 'ADDITIONAL_INFO_REQUIRED', 'VALIDATED', 'PUBLISHED', 'SUSPENDED', 'ASSIGNED', 'CANCELLED', 'ARCHIVED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'providerProfile',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('bio', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('categories', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('city', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('country', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('currency', 'text', { default: lit('MAD'), codecRef: { codecId: 'pg/text@1' } }),
          col('displayName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('headline', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('hourlyRate', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isAvailable', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('organizationId', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('portfolio', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('score', 'numeric', { codecRef: { codecId: 'pg/numeric@1' } }),
          col('sectors', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('skills', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('yearsExperience', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'providerVerification',
        columns: [
          col('additionalInfo', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('documents', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('expiresAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('providerProfileId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('rejectionReason', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('reviewedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('reviewedById', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('submittedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('testResults', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'providerVerification_status_check_88473a6b',
            "\"status\" IN ('DRAFT', 'IN_REVIEW', 'ADDITIONAL_INFO_REQUIRED', 'TEST', 'VERIFIED', 'SUSPENDED', 'REJECTED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'role',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'role_name_check_e9d2492f',
            "\"name\" IN ('CLIENT', 'PROVIDER', 'ADVISOR', 'QUALITY_EXPERT', 'FINANCE_ADMIN', 'ADMIN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'roleAssignment',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('createdById', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('organizationId', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('roleId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rolePermission',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('permissionId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('roleId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerifiedAt', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('firstName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('lastLoginAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('lastName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'user_status_check_ba02277c',
            "\"status\" IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'organizationMembership',
        constraint: 'organizationMembership_userId_organizationId_key',
        columns: ['userId', 'organizationId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'permission',
        constraint: 'permission_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'providerProfile',
        constraint: 'providerProfile_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'role',
        constraint: 'role_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'roleAssignment',
        constraint: 'roleAssignment_userId_roleId_organizationId_key',
        columns: ['userId', 'roleId', 'organizationId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'rolePermission',
        constraint: 'rolePermission_roleId_permissionId_key',
        columns: ['roleId', 'permissionId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'organization',
        index: 'organization_ownerId_idx_e2d0c1ef',
        columns: ['ownerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'organizationMembership',
        index: 'organizationMembership_organizationId_idx_2e17ef41',
        columns: ['organizationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'organizationMembership',
        index: 'organizationMembership_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'permission',
        index: 'permission_createdById_idx_8bf640ed',
        columns: ['createdById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectRequest',
        index: 'projectRequest_category_idx_f2600f8e',
        columns: ['category'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectRequest',
        index: 'projectRequest_clientId_idx_153a9a49',
        columns: ['clientId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectRequest',
        index: 'projectRequest_createdAt_idx_9575dbd7',
        columns: ['createdAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectRequest',
        index: 'projectRequest_organizationId_idx_2e17ef41',
        columns: ['organizationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectRequest',
        index: 'projectRequest_providerId_idx_d1904c54',
        columns: ['providerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectRequest',
        index: 'projectRequest_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'providerProfile',
        index: 'providerProfile_isAvailable_idx_8be51ca3',
        columns: ['isAvailable'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'providerProfile',
        index: 'providerProfile_organizationId_idx_2e17ef41',
        columns: ['organizationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'providerVerification',
        index: 'providerVerification_providerProfileId_idx_690ca18b',
        columns: ['providerProfileId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'providerVerification',
        index: 'providerVerification_reviewedById_idx_e2835478',
        columns: ['reviewedById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'providerVerification',
        index: 'providerVerification_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'roleAssignment',
        index: 'roleAssignment_createdById_idx_8bf640ed',
        columns: ['createdById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'roleAssignment',
        index: 'roleAssignment_organizationId_idx_2e17ef41',
        columns: ['organizationId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'roleAssignment',
        index: 'roleAssignment_roleId_idx_ffccc9a4',
        columns: ['roleId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'roleAssignment',
        index: 'roleAssignment_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rolePermission',
        index: 'rolePermission_permissionId_idx_f46fcdf5',
        columns: ['permissionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rolePermission',
        index: 'rolePermission_roleId_idx_ffccc9a4',
        columns: ['roleId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'organization',
        foreignKey: {
          name: 'organization_ownerId_fkey',
          columns: ['ownerId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'organizationMembership',
        foreignKey: {
          name: 'organizationMembership_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'organizationMembership',
        foreignKey: {
          name: 'organizationMembership_organizationId_fkey',
          columns: ['organizationId'],
          references: { schema: 'public', table: 'organization', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'permission',
        foreignKey: {
          name: 'permission_createdById_fkey',
          columns: ['createdById'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectRequest',
        foreignKey: {
          name: 'projectRequest_clientId_fkey',
          columns: ['clientId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectRequest',
        foreignKey: {
          name: 'projectRequest_organizationId_fkey',
          columns: ['organizationId'],
          references: { schema: 'public', table: 'organization', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectRequest',
        foreignKey: {
          name: 'projectRequest_providerId_fkey',
          columns: ['providerId'],
          references: { schema: 'public', table: 'providerProfile', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'providerProfile',
        foreignKey: {
          name: 'providerProfile_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'providerProfile',
        foreignKey: {
          name: 'providerProfile_organizationId_fkey',
          columns: ['organizationId'],
          references: { schema: 'public', table: 'organization', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'providerVerification',
        foreignKey: {
          name: 'providerVerification_providerProfileId_fkey',
          columns: ['providerProfileId'],
          references: { schema: 'public', table: 'providerProfile', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'providerVerification',
        foreignKey: {
          name: 'providerVerification_reviewedById_fkey',
          columns: ['reviewedById'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'roleAssignment',
        foreignKey: {
          name: 'roleAssignment_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'roleAssignment',
        foreignKey: {
          name: 'roleAssignment_roleId_fkey',
          columns: ['roleId'],
          references: { schema: 'public', table: 'role', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'roleAssignment',
        foreignKey: {
          name: 'roleAssignment_organizationId_fkey',
          columns: ['organizationId'],
          references: { schema: 'public', table: 'organization', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'roleAssignment',
        foreignKey: {
          name: 'roleAssignment_createdById_fkey',
          columns: ['createdById'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rolePermission',
        foreignKey: {
          name: 'rolePermission_roleId_fkey',
          columns: ['roleId'],
          references: { schema: 'public', table: 'role', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rolePermission',
        foreignKey: {
          name: 'rolePermission_permissionId_fkey',
          columns: ['permissionId'],
          references: { schema: 'public', table: 'permission', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
