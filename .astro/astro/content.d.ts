declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		"certificacoes": {
"01-bacharel": {
	id: "01-bacharel";
  collection: "certificacoes";
  data: InferEntrySchema<"certificacoes">
};
"02-lpic1": {
	id: "02-lpic1";
  collection: "certificacoes";
  data: InferEntrySchema<"certificacoes">
};
"03-lpic2": {
	id: "03-lpic2";
  collection: "certificacoes";
  data: InferEntrySchema<"certificacoes">
};
"04-az900": {
	id: "04-az900";
  collection: "certificacoes";
  data: InferEntrySchema<"certificacoes">
};
};
"experiencias": {
"00-magalucloud": {
	id: "00-magalucloud";
  collection: "experiencias";
  data: InferEntrySchema<"experiencias">
};
"01-cloud-sre": {
	id: "01-cloud-sre";
  collection: "experiencias";
  data: InferEntrySchema<"experiencias">
};
"02-analista-infra-2": {
	id: "02-analista-infra-2";
  collection: "experiencias";
  data: InferEntrySchema<"experiencias">
};
"03-analista-infra-1": {
	id: "03-analista-infra-1";
  collection: "experiencias";
  data: InferEntrySchema<"experiencias">
};
"04-estagio": {
	id: "04-estagio";
  collection: "experiencias";
  data: InferEntrySchema<"experiencias">
};
};
"habilidades": {
"containers": {
	id: "containers";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"devops": {
	id: "devops";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"ia": {
	id: "ia";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"infraestrutura": {
	id: "infraestrutura";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"kubernetes": {
	id: "kubernetes";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"nuvens-governanca": {
	id: "nuvens-governanca";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"observabilidade": {
	id: "observabilidade";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
"plataforma": {
	id: "plataforma";
  collection: "habilidades";
  data: InferEntrySchema<"habilidades">
};
};
"perfil": {
"marcos": {
	id: "marcos";
  collection: "perfil";
  data: InferEntrySchema<"perfil">
};
};
"sobre": {
"marcos": {
	id: "marcos";
  collection: "sobre";
  data: InferEntrySchema<"sobre">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
