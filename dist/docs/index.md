## Classes

<dl>
<dt><a href="#Lodger">Lodger</a></dt>
<dd></dd>
<dt><a href="#LodgerError">LodgerError</a></dt>
<dd><p>Error logger</p></dd>
<dt><a href="#FormError">FormError</a></dt>
<dd><p>Error logger for forms</p></dd>
<dt><a href="#Field">Field</a></dt>
<dd></dd>
<dt><a href="#Form">Form</a></dt>
<dd></dd>
<dt><a href="#Schema">Schema</a></dt>
<dd></dd>
<dt><a href="#Subscriber">Subscriber</a></dt>
<dd></dd>
<dt><a href="#Taxonomy">Taxonomy</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#plugins">plugins</a></dt>
<dd><p>Plugins</p></dd>
<dt><a href="#sharedStoreMethods">sharedStoreMethods</a></dt>
<dd></dd>
<dt><a href="#fields">fields</a></dt>
<dd><p>o cheltuiala = parte dintr-o factura</p></dd>
<dt><a href="#commonFields">commonFields</a></dt>
<dd><p>Common fields for all taxonomies</p></dd>
<dt><a href="#state">state</a></dt>
<dd><p>Preferences MODULE</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#toRxDBtype">toRxDBtype(type)</a> ⇒ <code>string</code></dt>
<dd><p>Converteste tipurile campurilor &#39;noastre&#39; in primare</p>
<p>Explicatie:
DB-ul nu stie decat de tipurile primare:
-&gt; boolean, string, number, array, object
Schema noastra e mult mai detaliata</p></dd>
<dt><a href="#prepareRxSchema">prepareRxSchema()</a></dt>
<dd><p>Makes a valid RxJsonSchema out of a Form</p></dd>
<dt><a href="#toSchemaField">toSchemaField(field)</a></dt>
<dd><p>Transforms a lodger form field to a valid RxSchema one</p></dd>
<dt><a href="#pushFieldToSchema">pushFieldToSchema(formItem, schema)</a> ⇒ <code>Object</code></dt>
<dd><p>Adauga un camp la schema Rx</p></dd>
<dt><a href="#assignRefIdsFromStore">assignRefIdsFromStore({)</a> ⇒ <code>Object</code></dt>
<dd><p>Pt taxonomia ceruta
ia formul
si tot ce are nevoie de Id de altceva
se populeaza</p></dd>
<dt><a href="#handleOnSubmit">handleOnSubmit(data)</a></dt>
<dd><p>Manipulates the final data before submitting the form to the DB</p></dd>
<dt><a href="#addCommonFieldsToSchema">addCommonFieldsToSchema(schema, commonFields)</a></dt>
<dd><p>Common fields for all taxonomies</p></dd>
<dt><a href="#createEmptyStoreModule">createEmptyStoreModule()</a></dt>
<dd><p>Creates an empty store module</p></dd>
<dt><a href="#setupSharedMethods">setupSharedMethods(taxonomy)</a></dt>
<dd><p>Shared methods across taxonomies, called individually</p></dd>
<dt><a href="#setupFromFile">setupFromFile()</a></dt>
<dd><p>Loads a taxonomy&#39;s store data from it&#39;s filename in store</p></dd>
<dt><a href="#initialSubscribe">initialSubscribe(param0)</a></dt>
<dd><p>FIrst time init hook for a taxonomy</p></dd>
<dt><a href="#use">use(module, namespaced)</a></dt>
<dd><p>Use a store module
to be used before calling the constructor</p></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#String">String</a></dt>
<dd><p>String helpers extensions</p></dd>
<dt><a href="#LodgerSchema">LodgerSchema</a></dt>
<dd></dd>
</dl>

<a name="String"></a>

## String
<p>String helpers extensions</p>

**Kind**: global interface  

* [String](#String)
    * [.stripLeading$()](#String+stripLeading$) ⇒ [<code>String</code>](#String)
    * [.spleet()](#String+spleet) ⇒ <code>SplitObject</code>
    * [.slugify()](#String+slugify) ⇒ [<code>String</code>](#String)
    * [.toRxDBtype()](#String+toRxDBtype) ⇒ <code>string</code>

<a name="String+stripLeading$"></a>

### string.stripLeading$() ⇒ [<code>String</code>](#String)
<p>Removes the '$' at the begining of a string</p>

**Kind**: instance method of [<code>String</code>](#String)  
**Returns**: [<code>String</code>](#String) - <p>the parsed string</p>  
<a name="String+spleet"></a>

### string.spleet() ⇒ <code>SplitObject</code>
<p>Splits a mutation string (eg. 'asociatie/INCASEAZA')</p>

**Kind**: instance method of [<code>String</code>](#String)  
<a name="String+slugify"></a>

### string.slugify() ⇒ [<code>String</code>](#String)
<p>Slugifies a string</p>

**Kind**: instance method of [<code>String</code>](#String)  
**Returns**: [<code>String</code>](#String) - <p>the slug</p>  
<a name="String+toRxDBtype"></a>

### string.toRxDBtype() ⇒ <code>string</code>
<p>Converts a LodgerField type to RxDB compatible one</p>
<p>Explicatie:
DB-ul nu stie decat de tipurile primare:
-&gt; boolean, string, number, array, object
Schema noastra e mult mai detaliata</p>

**Kind**: instance method of [<code>String</code>](#String)  
**Returns**: <code>string</code> - <ul>
<li>tipul primar, eg. 'string'</li>
</ul>  
<a name="LodgerSchema"></a>

## LodgerSchema
**Kind**: global interface  
<a name="Lodger"></a>

## Lodger
**Kind**: global class  

* [Lodger](#Lodger)
    * _instance_
        * [.notify](#Lodger+notify)
        * [._activeDocument](#Lodger+_activeDocument)
        * [.taxonomiesWithoutReference](#Lodger+taxonomiesWithoutReference) ⇒ <code>Array</code>
        * [.plugins](#Lodger+plugins)
        * [.getters](#Lodger+getters)
        * [.preferences](#Lodger+preferences)
        * [.activeReferencesIds](#Lodger+activeReferencesIds) ⇒ <code>Object</code>
        * [.trash(taxonomie, id)](#Lodger+trash)
        * [.search(input)](#Lodger+search)
        * [.subscribe()](#Lodger+subscribe) ⇒ [<code>Subscriber</code>](#Subscriber)
        * [.setPreference()](#Lodger+setPreference)
        * [.destroy()](#Lodger+destroy)
        * [.export()](#Lodger+export)
        * [.import()](#Lodger+import)
        * [.unsubscribeAll(subscriberName)](#Lodger+unsubscribeAll)
    * _static_
        * [.build(options)](#Lodger.build) ⇒ [<code>Lodger</code>](#Lodger)
        * [.use(plugin)](#Lodger.use)

<a name="Lodger+notify"></a>

### lodger.notify
<p>Notifies the user about an update/change</p>

**Kind**: instance Store action wrapper of [<code>Lodger</code>](#Lodger)  

| Param | Type |
| --- | --- |
| notification | <code>LdgNotification</code> | 

<a name="Lodger+_activeDocument"></a>

### lodger.\_activeDocument
<p>Active document for taxonomy</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+taxonomiesWithoutReference"></a>

### lodger.taxonomiesWithoutReference ⇒ <code>Array</code>
<p>Array of taxonomies that have no reference
root taxonomies</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+plugins"></a>

### lodger.plugins
<p>Active plugins list</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+getters"></a>

### lodger.getters
<p>Lodger Getters
All UI connects with this
combines DB &amp; Store getters</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+preferences"></a>

### lodger.preferences
<p>Combined preferences getter
gets values from DB and store</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+activeReferencesIds"></a>

### lodger.activeReferencesIds ⇒ <code>Object</code>
<p>For taxonomies that have references
get the referred ids</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+trash"></a>

### lodger.trash(taxonomie, id)
<p>Removes a Document from the DB</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  

| Param |
| --- |
| taxonomie | 
| id | 

<a name="Lodger+search"></a>

### lodger.search(input)
<p>Cauta in searchMap</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  

| Param | Description |
| --- | --- |
| input | <p>string de cautat</p> |

<a name="Lodger+subscribe"></a>

### lodger.subscribe() ⇒ [<code>Subscriber</code>](#Subscriber)
<p>Updateaza datele subscriberi-lor,
date folosite de getteri pentru a fi
afisate in interfata</p>
<p>TODO: de exportat de -aici</p>
<p>Usage: subscribes DB changes to a given variable (binder)</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+setPreference"></a>

### lodger.setPreference()
<p>Sets a preference either in DB or store</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+destroy"></a>

### lodger.destroy()
<p>Destroys the Lodger instance</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+export"></a>

### lodger.export()
<p>Exports the DB
as a YML file with ext .ldb
date is captured</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+import"></a>

### lodger.import()
<p>TODO!!</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+unsubscribeAll"></a>

### lodger.unsubscribeAll(subscriberName)
<p>Kills all active listeners for a given subscriber name</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  

| Param | Default |
| --- | --- |
| subscriberName | <code>main</code> | 

<a name="Lodger.build"></a>

### Lodger.build(options) ⇒ [<code>Lodger</code>](#Lodger)
<p>Init / build function</p>
<p>Build steps: (order matters)</p>
<ol>
<li>Hook up the taxonomies</li>
<li>Lodger Forms based on taxonomies</li>
<li>DB</li>
<li>Store</li>
</ol>

**Kind**: static method of [<code>Lodger</code>](#Lodger)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 

<a name="Lodger.use"></a>

### Lodger.use(plugin)
<p>Extend Lodger :)
Todo!</p>

**Kind**: static method of [<code>Lodger</code>](#Lodger)  

| Param | Type |
| --- | --- |
| plugin | <code>LodgerPlugin</code> | 

<a name="LodgerError"></a>

## LodgerError
<p>Error logger</p>

**Kind**: global class  
<a name="FormError"></a>

## FormError
<p>Error logger for forms</p>

**Kind**: global class  
**Implements**: <code>Error</code>  
<a name="Field"></a>

## Field
**Kind**: global class  
**Implements**: <code>SchemaField</code>  

* [Field](#Field)
    * [.exports.Field](#Field.exports.Field)
        * [new exports.Field(field)](#new_Field.exports.Field_new)

<a name="Field.exports.Field"></a>

### Field.exports.Field
**Kind**: static class of [<code>Field</code>](#Field)  
<a name="new_Field.exports.Field_new"></a>

#### new exports.Field(field)
<p>Creates an instance of Field.</p>


| Param | Type |
| --- | --- |
| field | <code>LodgerFormItemCreator</code> | 

<a name="Form"></a>

## Form
**Kind**: global class  
**Implements**: <code>LodgerForm</code>  

* [Form](#Form)
    * [new Form()](#new_Form_new)
    * _instance_
        * [.value(isNewForm)](#Form+value) ⇒ <code>Object</code>
        * [.handleOnSubmit(data)](#Form+handleOnSubmit)
    * _static_
        * [.Form](#Form.Form)
            * [new Form(data, [generateRxCollection])](#new_Form.Form_new)
        * [.load(name)](#Form.load)

<a name="new_Form_new"></a>

### new Form()
<p>Forms are read from within the <code>lib/forms/</code> directory</p>

<a name="Form+value"></a>

### form.value(isNewForm) ⇒ <code>Object</code>
<p>Makes a Vue-ready $data {object} suitable to be completed
by the user in the end form
as it will turn reactive</p>

**Kind**: instance method of [<code>Form</code>](#Form)  
**Summary**: <p>for new forms, values are all undefined</p>  
**Returns**: <code>Object</code> - <p>data item (Vue $data - ready)</p>  

| Param | Type | Description |
| --- | --- | --- |
| isNewForm | <code>Boolean</code> | <p>mostly used for 'add' forms</p> |

<a name="Form+handleOnSubmit"></a>

### form.handleOnSubmit(data)
<p>Manipulates the final data before submitting the form to the DB</p>

**Kind**: instance method of [<code>Form</code>](#Form)  

| Param |
| --- |
| data | 

<a name="Form.Form"></a>

### Form.Form
**Kind**: static class of [<code>Form</code>](#Form)  
<a name="new_Form.Form_new"></a>

#### new Form(data, [generateRxCollection])
<p>Creates an instance of Form.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>LodgerFormCreator</code> |  | <p>Form input data</p> |
| [generateRxCollection] | <code>boolean</code> | <code>true</code> | <p>some forms don't require this</p> |

<a name="Form.load"></a>

### Form.load(name)
<p>Loads a 'known' form by name</p>

**Kind**: static method of [<code>Form</code>](#Form)  

| Param |
| --- |
| name | 

<a name="Schema"></a>

## Schema
**Kind**: global class  
**Implements**: [<code>LodgerSchema</code>](#LodgerSchema)  

* [Schema](#Schema)
    * _instance_
        * [.addField(field)](#Schema+addField)
    * _static_
        * [.Schema](#Schema.Schema)
            * [new Schema(form, [addCommonMethods])](#new_Schema.Schema_new)

<a name="Schema+addField"></a>

### schema.addField(field)
**Kind**: instance method of [<code>Schema</code>](#Schema)  

| Param | Type |
| --- | --- |
| field | <code>LodgerFormItemCreator</code> | 

<a name="Schema.Schema"></a>

### Schema.Schema
**Kind**: static class of [<code>Schema</code>](#Schema)  
<a name="new_Schema.Schema_new"></a>

#### new Schema(form, [addCommonMethods])
<p>Constructs a valid RxJsonSchema out of a Lodger Form Data item</p>

**Returns**: <code>RxJsonSchema</code> - <p>schema</p>  

| Param | Type |
| --- | --- |
| form | <code>LodgerFormCreator</code> | 
| [addCommonMethods] | <code>boolean</code> | 

<a name="Subscriber"></a>

## Subscriber
**Kind**: global class  
**Implements**: <code>LodgerSubscriber</code>  
**Requires**: <code>module:Vue</code>  

* [Subscriber](#Subscriber)
    * [new Subscriber()](#new_Subscriber_new)
    * [.exports.Subscriber](#Subscriber.exports.Subscriber)
        * [new exports.Subscriber(name, taxonomy, criteriu)](#new_Subscriber.exports.Subscriber_new)

<a name="new_Subscriber_new"></a>

### new Subscriber()
<p>Creates a new subscriber for a specific taxonomy</p>

<a name="Subscriber.exports.Subscriber"></a>

### Subscriber.exports.Subscriber
**Kind**: static class of [<code>Subscriber</code>](#Subscriber)  
<a name="new_Subscriber.exports.Subscriber_new"></a>

#### new exports.Subscriber(name, taxonomy, criteriu)
<p>Creates an instance of Subscriber.</p>

**Returns**: <code>Unwatcher</code> - <p>unwatch</p>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>eg. 'registru'</p> |
| taxonomy | [<code>Taxonomy</code>](#Taxonomy) |  |
| criteriu | <code>Criteriu</code> | <p>initial sort / filter criteria if it shall not use the default one</p> |

<a name="Taxonomy"></a>

## Taxonomy
**Kind**: global class  
**Implements**: <code>Taxonomie</code>  
**Requires**: <code>module:Form</code>  

* [Taxonomy](#Taxonomy)
    * [new Taxonomy(name, form)](#new_Taxonomy_new)
    * [.referenceTaxonomies](#Taxonomy+referenceTaxonomies) ⇒ <code>Array</code>
    * [.hasReference](#Taxonomy+hasReference) ⇒ <code>Boolean</code>
    * [.subscribed](#Taxonomy+subscribed) ⇒ <code>Boolean</code>
    * [.plural](#Taxonomy+plural) ⇒ [<code>String</code>](#String)
    * [.isMultipleSelecct](#Taxonomy+isMultipleSelecct) ⇒ <code>Boolean</code>
    * [.put(data)](#Taxonomy+put) ⇒ <code>RxDocument.&lt;Taxonomie&gt;</code>
    * [.select(taxonomie, id)](#Taxonomy+select)

<a name="new_Taxonomy_new"></a>

### new Taxonomy(name, form)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>Taxonomie</code> | <p>name of the form</p> |
| form | [<code>Form</code>](#Form) | <p>the constructed form item</p> |

<a name="Taxonomy+referenceTaxonomies"></a>

### taxonomy.referenceTaxonomies ⇒ <code>Array</code>
<p>Reference taxonomies of a taxonomy</p>

**Kind**: instance property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Array</code> - <p>taxonomii</p>  
<a name="Taxonomy+hasReference"></a>

### taxonomy.hasReference ⇒ <code>Boolean</code>
<p>Checks for a reference taxonomy of taxonomy</p>

**Kind**: instance property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Boolean</code> - <p>has a reference taxonomy or not</p>  
**Read only**: true  
<a name="Taxonomy+subscribed"></a>

### taxonomy.subscribed ⇒ <code>Boolean</code>
**Kind**: instance property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Boolean</code> - <p>if subscribed anywhere</p>  
**Read only**: true  
<a name="Taxonomy+plural"></a>

### taxonomy.plural ⇒ [<code>String</code>](#String)
**Kind**: instance property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: [<code>String</code>](#String) - <p>plural of taxonomy</p>  
**Read only**: true  
<a name="Taxonomy+isMultipleSelecct"></a>

### taxonomy.isMultipleSelecct ⇒ <code>Boolean</code>
**Kind**: instance property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Boolean</code> - <p>if taxonomy represents a multiple select choice</p>  
**Read only**: true  
<a name="Taxonomy+put"></a>

### taxonomy.put(data) ⇒ <code>RxDocument.&lt;Taxonomie&gt;</code>
<p>Inserts a new item in DB</p>

**Kind**: instance method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>RxDocument.&lt;Taxonomie&gt;</code> - <p>the fresh document</p>  

| Param | Type |
| --- | --- |
| data | <code>Object</code> | 

<a name="Taxonomy+select"></a>

### taxonomy.select(taxonomie, id)
<p>select an item
brings in the active Document from DB</p>

**Kind**: instance method of [<code>Taxonomy</code>](#Taxonomy)  

| Param |
| --- |
| taxonomie | 
| id | 

<a name="strings"></a>

## strings : <code>enum</code>
<p>Accepted 'string's for a LodgerSchema field</p>

**Kind**: global enum  
<a name="Errors"></a>

## Errors : <code>enum</code>
<p>Errors Definition</p>

**Kind**: global enum  
**Read only**: true  
**Todo**

- [ ] account for translations

<a name="plugins"></a>

## plugins
<p>Plugins</p>

**Kind**: global constant  
<a name="sharedStoreMethods"></a>

## sharedStoreMethods
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | <p>methodName: action }</p> |

<a name="fields"></a>

## fields
<p>o cheltuiala = parte dintr-o factura</p>

**Kind**: global constant  
<a name="commonFields"></a>

## commonFields
<p>Common fields for all taxonomies</p>

**Kind**: global constant  
<a name="state"></a>

## state
<p>Preferences MODULE</p>

**Kind**: global constant  
<a name="toRxDBtype"></a>

## toRxDBtype(type) ⇒ <code>string</code>
<p>Converteste tipurile campurilor 'noastre' in primare</p>
<p>Explicatie:
DB-ul nu stie decat de tipurile primare:
-&gt; boolean, string, number, array, object
Schema noastra e mult mai detaliata</p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>tipul primar, eg. 'string'</li>
</ul>  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

<a name="prepareRxSchema"></a>

## prepareRxSchema()
<p>Makes a valid RxJsonSchema out of a Form</p>

**Kind**: global function  
<a name="toSchemaField"></a>

## toSchemaField(field)
<p>Transforms a lodger form field to a valid RxSchema one</p>

**Kind**: global function  

| Param |
| --- |
| field | 

<a name="pushFieldToSchema"></a>

## pushFieldToSchema(formItem, schema) ⇒ <code>Object</code>
<p>Adauga un camp la schema Rx</p>

**Kind**: global function  
**Returns**: <code>Object</code> - <p>schema modificata</p>  

| Param | Type | Description |
| --- | --- | --- |
| formItem | <code>Object</code> | <p>campu'</p> |
| schema | <code>Object</code> | <p>schema colectiei</p> |

<a name="assignRefIdsFromStore"></a>

## assignRefIdsFromStore({) ⇒ <code>Object</code>
<p>Pt taxonomia ceruta
ia formul
si tot ce are nevoie de Id de altceva
se populeaza</p>

**Kind**: global function  
**Returns**: <code>Object</code> - <p>eg { asociatieId: 'XXXX' }</p>  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | <p>references, getters }</p> |

<a name="handleOnSubmit"></a>

## handleOnSubmit(data)
<p>Manipulates the final data before submitting the form to the DB</p>

**Kind**: global function  

| Param |
| --- |
| data | 

<a name="addCommonFieldsToSchema"></a>

## addCommonFieldsToSchema(schema, commonFields)
<p>Common fields for all taxonomies</p>

**Kind**: global function  

| Param |
| --- |
| schema | 
| commonFields | 

<a name="createEmptyStoreModule"></a>

## createEmptyStoreModule()
<p>Creates an empty store module</p>

**Kind**: global function  
<a name="createEmptyStoreModule..state"></a>

### createEmptyStoreModule~state
<p>Empties</p>

**Kind**: inner constant of [<code>createEmptyStoreModule</code>](#createEmptyStoreModule)  
<a name="setupSharedMethods"></a>

## setupSharedMethods(taxonomy)
<p>Shared methods across taxonomies, called individually</p>

**Kind**: global function  
**Requires**: <code>module:sharedMethods</code>  

| Param |
| --- |
| taxonomy | 

<a name="setupFromFile"></a>

## setupFromFile()
<p>Loads a taxonomy's store data from it's filename in store</p>

**Kind**: global function  
<a name="initialSubscribe"></a>

## initialSubscribe(param0)
<p>FIrst time init hook for a taxonomy</p>

**Kind**: global function  

| Param |
| --- |
| param0 | 

<a name="use"></a>

## use(module, namespaced)
<p>Use a store module
to be used before calling the constructor</p>

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| module |  |  |  |
| namespaced | <code>Boolean</code> | <code>true</code> | <p>if it should be namespaced</p> |

