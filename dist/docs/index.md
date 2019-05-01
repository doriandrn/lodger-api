## Classes

<dl>
<dt><a href="#Lodger">Lodger</a></dt>
<dd><p>The main API</p></dd>
<dt><a href="#Field">Field</a> ⇐ <code>RxJsonSchemaTopLevel</code></dt>
<dd><p>Form Field Item</p></dd>
<dt><a href="#Form">Form</a></dt>
<dd></dd>
<dt><a href="#Schema">Schema</a> ⇐ <code>RxJsonSchema</code></dt>
<dd></dd>
<dt><a href="#Taxonomy">Taxonomy</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#name">name</a></dt>
<dd><p>DO NOT CHANGE ANY OF THESE
as existing tests run on them</p>
<p>Rather, create new / extend the stubs / vars and export them</p></dd>
<dt><a href="#sharedStoreMethods">sharedStoreMethods</a></dt>
<dd></dd>
<dt><a href="#state">state</a></dt>
<dd><p>Preferences MODULE</p></dd>
<dt><a href="#get_bigrams">get_bigrams</a></dt>
<dd><p>Helpers</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#load">load(name)</a></dt>
<dd><p>Loads a &#39;known&#39; schema by name</p></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#LodgerForm">LodgerForm</a></dt>
<dd></dd>
<dt><a href="#LodgerSchema">LodgerSchema</a></dt>
<dd></dd>
<dt><a href="#SubscribableTaxonomy">SubscribableTaxonomy</a> ⇐ <code>LodgerTaxonomy&lt;any,</code></dt>
<dd></dd>
</dl>

<a name="LodgerForm"></a>

## LodgerForm
**Kind**: global interface  
<a name="notify"></a>

## notify
<p>Notifies the user and also us, the devs, of anything!</p>

**Kind**: global Store action wrapper
fallsback to console  

| Param | Type |
| --- | --- |
| notification | <code>Notification</code> | 

<a name="LodgerSchema"></a>

## LodgerSchema
**Kind**: global interface  
<a name="SubscribableTaxonomy"></a>

## SubscribableTaxonomy ⇐ <code>LodgerTaxonomy&lt;any,</code>
**Kind**: global interface  
**Extends**: <code>LodgerTaxonomy&lt;any,</code>  
**Template**: N  
**Template**: S  
<a name="Lodger"></a>

## Lodger
<p>The main API</p>

**Kind**: global class  
**Implements**: <code>LodgerAPI</code>  
**Requires**: <code>module:&lt;rxdb&gt;</code>  

* [Lodger](#Lodger)
    * [new Lodger(forms, db)](#new_Lodger_new)
    * _instance_
        * [.taxonomiesWithoutReference](#Lodger+taxonomiesWithoutReference) ⇒ <code>Array</code>
        * [.activeReferencesIds](#Lodger+activeReferencesIds) ⇒ <code>Object</code>
        * [.subscribe()](#Lodger+subscribe) ⇒ <code>void</code>
        * [.destroy()](#Lodger+destroy)
        * [.export()](#Lodger+export)
        * [.import()](#Lodger+import)
    * _static_
        * [.build(options)](#Lodger.build) ⇒ [<code>Lodger</code>](#Lodger)
        * [.use(plugin)](#Lodger.use)

<a name="new_Lodger_new"></a>

### new Lodger(forms, db)
<p>Creates an instance of Lodger.</p>


| Param | Type |
| --- | --- |
| forms | <code>FormsHolder</code> | 
| db | <code>RxDatabase</code> | 

<a name="Lodger+taxonomiesWithoutReference"></a>

### lodger.taxonomiesWithoutReference ⇒ <code>Array</code>
<p>Array of taxonomies that have no reference
root taxonomies</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+activeReferencesIds"></a>

### lodger.activeReferencesIds ⇒ <code>Object</code>
<p>For taxonomies that have references
get the referred ids</p>

**Kind**: instance property of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+subscribe"></a>

### lodger.subscribe() ⇒ <code>void</code>
<p>Subscribes to multiple taxonomies with
same criteria</p>

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

<a name="Field"></a>

## Field ⇐ <code>RxJsonSchemaTopLevel</code>
<p>Form Field Item</p>

**Kind**: global class  
**Extends**: <code>RxJsonSchemaTopLevel</code>  
**Implements**: <code>SchemaField</code>  
**Requires**: <code>module:[String]</code>  

* [Field](#Field) ⇐ <code>RxJsonSchemaTopLevel</code>
    * [new exports.Field(data)](#new_Field_new)
    * [.rxSchema](#Field+rxSchema)

<a name="new_Field_new"></a>

### new exports.Field(data)
<p>Creates an instance of Field.</p>


| Param | Type |
| --- | --- |
| data | <code>FieldCreator.&lt;T&gt;</code> | 

<a name="Field+rxSchema"></a>

### field.rxSchema
<p>Used for Schema constructors,
returns only the properties needed for it</p>

**Kind**: instance property of [<code>Field</code>](#Field)  
<a name="Form"></a>

## Form
**Kind**: global class  
**Implements**: [<code>LodgerForm</code>](#LodgerForm)  

* [Form](#Form)
    * [new Form()](#new_Form_new)
    * _instance_
        * [.data](#Form+data) ⇒ <code>Object</code>
        * [.fieldsIds](#Form+fieldsIds) ⇒ <code>Array.&lt;string&gt;</code>
        * [.onsubmit](#Form+onsubmit)
        * [.value()](#Form+value) ⇒ <code>Object</code>
    * _static_
        * [.Form](#Form.Form)
            * [new Form(data, [generateRxCollection])](#new_Form.Form_new)

<a name="new_Form_new"></a>

### new Form()
<p>Lodder Form class</p>

<a name="Form+data"></a>

### form.data ⇒ <code>Object</code>
<p>Makes a Vue-ready $data {object} suitable to be completed
by the user in the frontend -&gt; new form
(as it will turn reactive)</p>

**Kind**: instance property of [<code>Form</code>](#Form)  
**Read only**: true  
<a name="Form+fieldsIds"></a>

### form.fieldsIds ⇒ <code>Array.&lt;string&gt;</code>
<p>Quick access to all fields' ids</p>

**Kind**: instance property of [<code>Form</code>](#Form)  
**Read only**: true  
<a name="Form+onsubmit"></a>

### form.onsubmit
<p>register a new onsubmit function</p>

**Kind**: instance property of [<code>Form</code>](#Form)  
<a name="Form+value"></a>

### form.value() ⇒ <code>Object</code>
<p>Gets the value of current active form</p>

**Kind**: instance method of [<code>Form</code>](#Form)  
**Summary**: <p>for new forms, values are all undefined</p>  
**Returns**: <code>Object</code> - <p>data item (Vue $data - ready)</p>  
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

<a name="Schema"></a>

## Schema ⇐ <code>RxJsonSchema</code>
**Kind**: global class  
**Extends**: <code>RxJsonSchema</code>  
**Implements**: [<code>LodgerSchema</code>](#LodgerSchema)  

* [Schema](#Schema) ⇐ <code>RxJsonSchema</code>
    * [.module.exports](#Schema.module.exports)
        * [new module.exports(form, [addCommonMethods])](#new_Schema.module.exports_new)
    * [.indexables](#Schema.indexables)
    * [.add(field)](#Schema.add)

<a name="Schema.module.exports"></a>

### Schema.module.exports
**Kind**: static class of [<code>Schema</code>](#Schema)  
<a name="new_Schema.module.exports_new"></a>

#### new module.exports(form, [addCommonMethods])
<p>Constructs a valid RxJsonSchema out of a Lodger Form Data item</p>

**Returns**: <code>RxJsonSchema</code> - <p>schema</p>  

| Param | Type |
| --- | --- |
| form | <code>LodgerFormCreator</code> | 
| [addCommonMethods] | <code>boolean</code> | 

<a name="Schema.indexables"></a>

### Schema.indexables
**Kind**: static property of [<code>Schema</code>](#Schema)  
**Read only**: true  
<a name="Schema.add"></a>

### Schema.add(field)
<p>Adds fields programatically as
we also need to fill in the required array</p>

**Kind**: static method of [<code>Schema</code>](#Schema)  

| Param | Type |
| --- | --- |
| field | <code>FieldCreator</code> | 

<a name="Taxonomy"></a>

## Taxonomy
**Kind**: global class  
**Implements**: <code>LodgerTaxonomy</code>  
**Requires**: <code>module:Form</code>  

* [Taxonomy](#Taxonomy)
    * [new Taxonomy(name, form)](#new_Taxonomy_new)
    * [._temp](#Taxonomy._temp)
        * [new _temp(form, collection)](#new_Taxonomy._temp_new)
    * [._temp#last](#Taxonomy._temp+last)
    * [._temp#name](#Taxonomy._temp+name)
    * [._temp#data](#Taxonomy._temp+data)
    * [._temp#subscribed](#Taxonomy._temp+subscribed) ⇒ <code>Boolean</code>
    * [._temp#trash(id)](#Taxonomy._temp+trash) ⇒ <code>RxDocument.&lt;T&gt;</code>
    * [._temp#put(doc)](#Taxonomy._temp+put) ⇒ <code>RxDocument.&lt;Taxonomie&gt;</code>
    * [.search(input)](#Taxonomy.search)
    * [._temp#subscribe([subscriberName], [criteriuCerut])](#Taxonomy._temp+subscribe) ⇒ <code>Promise.&lt;Subscriber.&lt;T&gt;&gt;</code>
    * [._temp#unsubscribeAll()](#Taxonomy._temp+unsubscribeAll) ⇒ <code>Promise</code>

<a name="new_Taxonomy_new"></a>

### new Taxonomy(name, form)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>Taxonomie</code> | <p>name of the form</p> |
| form | [<code>Form</code>](#Form) | <p>the constructed form item</p> |

<a name="Taxonomy._temp"></a>

### Taxonomy.\_temp
**Kind**: static class of [<code>Taxonomy</code>](#Taxonomy)  
<a name="new_Taxonomy._temp_new"></a>

#### new \_temp(form, collection)
<p>Creates an instance of Taxonomy.</p>


| Param | Type |
| --- | --- |
| form | <code>Form.&lt;T, Interface&gt;</code> | 
| collection | <code>RxCollection.&lt;T&gt;</code> | 

<a name="Taxonomy._temp+last"></a>

### Taxonomy.\_temp#last
<p>Last added item's id</p>

**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Read only**: true  
<a name="Taxonomy._temp+name"></a>

### Taxonomy.\_temp#name
**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Read only**: true  
<a name="Taxonomy._temp+data"></a>

### Taxonomy.\_temp#data
<p>Returns all data from subscribers</p>

**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Read only**: true  
<a name="Taxonomy._temp+subscribed"></a>

### Taxonomy.\_temp#subscribed ⇒ <code>Boolean</code>
**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Boolean</code> - <p>if subscribed anywhere</p>  
**Read only**: true  
<a name="Taxonomy._temp+trash"></a>

### Taxonomy.\_temp#trash(id) ⇒ <code>RxDocument.&lt;T&gt;</code>
<p>Removes a Document by ID from the collection</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>RxDocument.&lt;T&gt;</code> - <p>removed document</p>  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Taxonomy._temp+put"></a>

### Taxonomy.\_temp#put(doc) ⇒ <code>RxDocument.&lt;Taxonomie&gt;</code>
<p>Inserts/upserts a new item in DB</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>RxDocument.&lt;Taxonomie&gt;</code> - <p>the fresh document</p>  

| Param | Type |
| --- | --- |
| doc | <code>Object</code> | 

<a name="Taxonomy.search"></a>

### Taxonomy.search(input)
<p>Cauta in searchMap</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  

| Param | Description |
| --- | --- |
| input | <p>string de cautat</p> |

<a name="Taxonomy._temp+subscribe"></a>

### Taxonomy.\_temp#subscribe([subscriberName], [criteriuCerut]) ⇒ <code>Promise.&lt;Subscriber.&lt;T&gt;&gt;</code>
<p>Subscribes.</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Promise.&lt;Subscriber.&lt;T&gt;&gt;</code> - <p>the unwatcher for subscriber</p>  

| Param | Type | Default |
| --- | --- | --- |
| [subscriberName] | <code>string</code> | <code>&quot;&#x27;main&#x27;&quot;</code> | 
| [criteriuCerut] | <code>Criteriu</code> |  | 

<a name="Taxonomy._temp+unsubscribeAll"></a>

### Taxonomy.\_temp#unsubscribeAll() ⇒ <code>Promise</code>
<p>Kills all active listeners for a given subscriber name</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
<a name="Taxonomii"></a>

## Taxonomii : <code>enum</code>
<p>Taxonomies</p>

**Kind**: global enum  
<a name="Errors"></a>

## Errors : <code>enum</code>
<p>Errors Definition</p>

**Kind**: global enum  
**Read only**: true  
**Todo**

- [ ] account for translations

<a name="Errors"></a>

## Errors : <code>enum</code>
<p>Errors Definition</p>

**Kind**: global enum  
**Read only**: true  
**Todo**

- [ ] account for translations

<a name="strings"></a>

## strings : <code>enum</code>
<p>Accepted 'string's for a LodgerSchema field</p>

**Kind**: global enum  
<a name="name"></a>

## name
<p>DO NOT CHANGE ANY OF THESE
as existing tests run on them</p>
<p>Rather, create new / extend the stubs / vars and export them</p>

**Kind**: global constant  
<a name="sharedStoreMethods"></a>

## sharedStoreMethods
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | <p>methodName: action }</p> |

<a name="state"></a>

## state
<p>Preferences MODULE</p>

**Kind**: global constant  
<a name="get_bigrams"></a>

## get\_bigrams
<p>Helpers</p>

**Kind**: global constant  
<a name="load"></a>

## load(name)
<p>Loads a 'known' schema by name</p>

**Kind**: global function  

| Param |
| --- |
| name | 

