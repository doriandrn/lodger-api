/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */
import Schema from '~/lib/Schema';
export default function load(schemas: Schema<any, any>[]): Promise<any[]>;
