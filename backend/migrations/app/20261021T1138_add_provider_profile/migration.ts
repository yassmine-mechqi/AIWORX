#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4841a97bedc27eb6c375ad5dcaf2c30e91bcea4a27cef91127464ebe9a20b067/contract';
import endContract from '../../snapshots/4841a97bedc27eb6c375ad5dcaf2c30e91bcea4a27cef91127464ebe9a20b067/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/6492e103304b3ab78e2911af09998ff6b60133f5bd2837d368df733d3fd49ec7/contract';
import startContract from '../../snapshots/6492e103304b3ab78e2911af09998ff6b60133f5bd2837d368df733d3fd49ec7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropCheckConstraint({
        schema: 'public',
        table: 'role',
        constraint: 'role_name_check_e9d2492f',
      }),
      this.dataTransform(endContract, 'typechange-organization-id', {
        check: () => placeholder('typechange-organization-id:check'),
        run: () => placeholder('typechange-organization-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'organization',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-organization-ownerId', {
        check: () => placeholder('typechange-organization-ownerId:check'),
        run: () => placeholder('typechange-organization-ownerId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'organization',
        column: 'ownerId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-organizationMembership-id', {
        check: () => placeholder('typechange-organizationMembership-id:check'),
        run: () => placeholder('typechange-organizationMembership-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'organizationMembership',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-organizationMembership-organizationId', {
        check: () => placeholder('typechange-organizationMembership-organizationId:check'),
        run: () => placeholder('typechange-organizationMembership-organizationId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'organizationMembership',
        column: 'organizationId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-organizationMembership-userId', {
        check: () => placeholder('typechange-organizationMembership-userId:check'),
        run: () => placeholder('typechange-organizationMembership-userId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'organizationMembership',
        column: 'userId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-permission-createdById', {
        check: () => placeholder('typechange-permission-createdById:check'),
        run: () => placeholder('typechange-permission-createdById:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'permission',
        column: 'createdById',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-permission-id', {
        check: () => placeholder('typechange-permission-id:check'),
        run: () => placeholder('typechange-permission-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'permission',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-clientId', {
        check: () => placeholder('typechange-projectRequest-clientId:check'),
        run: () => placeholder('typechange-projectRequest-clientId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'clientId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-deliverables', {
        check: () => placeholder('typechange-projectRequest-deliverables:check'),
        run: () => placeholder('typechange-projectRequest-deliverables:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'deliverables',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-documents', {
        check: () => placeholder('typechange-projectRequest-documents:check'),
        run: () => placeholder('typechange-projectRequest-documents:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'documents',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-id', {
        check: () => placeholder('typechange-projectRequest-id:check'),
        run: () => placeholder('typechange-projectRequest-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-organizationId', {
        check: () => placeholder('typechange-projectRequest-organizationId:check'),
        run: () => placeholder('typechange-projectRequest-organizationId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'organizationId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-providerId', {
        check: () => placeholder('typechange-projectRequest-providerId:check'),
        run: () => placeholder('typechange-projectRequest-providerId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'providerId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-projectRequest-requirements', {
        check: () => placeholder('typechange-projectRequest-requirements:check'),
        run: () => placeholder('typechange-projectRequest-requirements:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'projectRequest',
        column: 'requirements',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-categories', {
        check: () => placeholder('typechange-providerProfile-categories:check'),
        run: () => placeholder('typechange-providerProfile-categories:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'categories',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-id', {
        check: () => placeholder('typechange-providerProfile-id:check'),
        run: () => placeholder('typechange-providerProfile-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-organizationId', {
        check: () => placeholder('typechange-providerProfile-organizationId:check'),
        run: () => placeholder('typechange-providerProfile-organizationId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'organizationId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-portfolio', {
        check: () => placeholder('typechange-providerProfile-portfolio:check'),
        run: () => placeholder('typechange-providerProfile-portfolio:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'portfolio',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-sectors', {
        check: () => placeholder('typechange-providerProfile-sectors:check'),
        run: () => placeholder('typechange-providerProfile-sectors:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'sectors',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-skills', {
        check: () => placeholder('typechange-providerProfile-skills:check'),
        run: () => placeholder('typechange-providerProfile-skills:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'skills',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerProfile-userId', {
        check: () => placeholder('typechange-providerProfile-userId:check'),
        run: () => placeholder('typechange-providerProfile-userId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerProfile',
        column: 'userId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerVerification-documents', {
        check: () => placeholder('typechange-providerVerification-documents:check'),
        run: () => placeholder('typechange-providerVerification-documents:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerVerification',
        column: 'documents',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerVerification-id', {
        check: () => placeholder('typechange-providerVerification-id:check'),
        run: () => placeholder('typechange-providerVerification-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerVerification',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerVerification-providerProfileId', {
        check: () => placeholder('typechange-providerVerification-providerProfileId:check'),
        run: () => placeholder('typechange-providerVerification-providerProfileId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerVerification',
        column: 'providerProfileId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerVerification-reviewedById', {
        check: () => placeholder('typechange-providerVerification-reviewedById:check'),
        run: () => placeholder('typechange-providerVerification-reviewedById:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerVerification',
        column: 'reviewedById',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-providerVerification-testResults', {
        check: () => placeholder('typechange-providerVerification-testResults:check'),
        run: () => placeholder('typechange-providerVerification-testResults:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'providerVerification',
        column: 'testResults',
        options: {
          qualifiedTargetType: 'json',
          formatTypeExpected: 'json',
          rawTargetTypeForLabel: 'json',
        },
      }),
      this.dataTransform(endContract, 'typechange-role-id', {
        check: () => placeholder('typechange-role-id:check'),
        run: () => placeholder('typechange-role-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'role',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-roleAssignment-createdById', {
        check: () => placeholder('typechange-roleAssignment-createdById:check'),
        run: () => placeholder('typechange-roleAssignment-createdById:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'roleAssignment',
        column: 'createdById',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-roleAssignment-id', {
        check: () => placeholder('typechange-roleAssignment-id:check'),
        run: () => placeholder('typechange-roleAssignment-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'roleAssignment',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-roleAssignment-organizationId', {
        check: () => placeholder('typechange-roleAssignment-organizationId:check'),
        run: () => placeholder('typechange-roleAssignment-organizationId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'roleAssignment',
        column: 'organizationId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-roleAssignment-roleId', {
        check: () => placeholder('typechange-roleAssignment-roleId:check'),
        run: () => placeholder('typechange-roleAssignment-roleId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'roleAssignment',
        column: 'roleId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-roleAssignment-userId', {
        check: () => placeholder('typechange-roleAssignment-userId:check'),
        run: () => placeholder('typechange-roleAssignment-userId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'roleAssignment',
        column: 'userId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-rolePermission-id', {
        check: () => placeholder('typechange-rolePermission-id:check'),
        run: () => placeholder('typechange-rolePermission-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'rolePermission',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-rolePermission-permissionId', {
        check: () => placeholder('typechange-rolePermission-permissionId:check'),
        run: () => placeholder('typechange-rolePermission-permissionId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'rolePermission',
        column: 'permissionId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-rolePermission-roleId', {
        check: () => placeholder('typechange-rolePermission-roleId:check'),
        run: () => placeholder('typechange-rolePermission-roleId:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'rolePermission',
        column: 'roleId',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.dataTransform(endContract, 'typechange-user-id', {
        check: () => placeholder('typechange-user-id:check'),
        run: () => placeholder('typechange-user-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'user',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'role',
        constraint: 'role_name_check_e185ff3d',
        expression:
          "\"name\" IN ('CLIENT', 'PROVIDER', 'ADVISOR', 'QUALITY_EXPERT', 'FINANCE_ADMIN', 'ADMIN', 'SUPERADMIN')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
