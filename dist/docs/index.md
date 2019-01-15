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
<dt><a href="#Subscriber">Subscriber</a></dt>
<dd></dd>
<dt><a href="#Taxonomy">Taxonomy</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#sharedStoreMethods">sharedStoreMethods</a></dt>
<dd></dd>
<dt><a href="#commonFields">commonFields</a></dt>
<dd><p>Common fields for all taxonomies</p></dd>
<dt><a href="#state">state</a></dt>
<dd><p>Preferences MODULE</p></dd>
<dt><a href="#get_bigrams">get_bigrams</a></dt>
<dd><p>Helpers</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#createEmptyStoreModule">createEmptyStoreModule()</a></dt>
<dd><p>Creates an empty store module</p></dd>
<dt><a href="#setupSharedMethods">setupSharedMethods(taxonomy)</a></dt>
<dd><p>Shared methods across taxonomies, called individually</p></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#LodgerForm">LodgerForm</a></dt>
<dd></dd>
<dt><a href="#LodgerSchema">LodgerSchema</a></dt>
<dd></dd>
<dt><a href="#LodgerTaxonomy">LodgerTaxonomy</a></dt>
<dd><p>Taxonomy item</p></dd>
<dt><a href="#SubscribableTaxonomy">SubscribableTaxonomy</a> ⇐ <code>LodgerTaxonomy&lt;any,</code></dt>
<dd></dd>
</dl>

<a name="LodgerForm"></a>

## LodgerForm
**Kind**: global interface  
<a name="notify"></a>

## notify
**Kind**: global Store action wrapper
fallsback to console  

| Param | Type |
| --- | --- |
| notification | <code>Notification</code> | 

<a name="LodgerSchema"></a>

## LodgerSchema
**Kind**: global interface  
<a name="LodgerTaxonomy"></a>

## LodgerTaxonomy
<p>Taxonomy item</p>

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
        * [.getters](#Lodger+getters)
        * [.preferences](#Lodger+preferences)
        * [.activeReferencesIds](#Lodger+activeReferencesIds) ⇒ <code>Object</code>
        * [.subscribe()](#Lodger+subscribe) ⇒ <code>void</code>
        * [.setPreference()](#Lodger+setPreference)
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
<a name="Lodger+subscribe"></a>

### lodger.subscribe() ⇒ <code>void</code>
<p>Subscribes to multiple taxonomies with
same criteria</p>

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
<a name="new_Field_new"></a>

### new exports.Field(data)
<p>Creates an instance of Field.</p>


| Param | Type |
| --- | --- |
| data | <code>FieldCreator.&lt;T&gt;</code> | 

<a name="Form"></a>

## Form
**Kind**: global class  
**Implements**: [<code>LodgerForm</code>](#LodgerForm)  

* [Form](#Form)
    * [new Form()](#new_Form_new)
    * _instance_
        * [.data](#Form+data) ⇒ <code>Object</code>
        * [.capureTimestamp](#Form+capureTimestamp)
        * [.fieldsIds](#Form+fieldsIds) ⇒ <code>Array.&lt;string&gt;</code>
        * [.value()](#Form+value) ⇒ <code>Object</code>
    * _static_
        * [.Form](#Form.Form)
            * [new Form(data, [generateRxCollection])](#new_Form.Form_new)
        * [.load(name)](#Form.load)

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
<a name="Form+capureTimestamp"></a>

### form.capureTimestamp
<p>Everytime the value is accessed
if 'la' field is present</p>

**Kind**: instance property of [<code>Form</code>](#Form)  
**Read only**: true  
<a name="Form+fieldsIds"></a>

### form.fieldsIds ⇒ <code>Array.&lt;string&gt;</code>
<p>Quick access to all fields' ids</p>

**Kind**: instance property of [<code>Form</code>](#Form)  
**Read only**: true  
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

<a name="Form.load"></a>

### Form.load(name)
<p>Loads a 'known' form by name</p>

**Kind**: static method of [<code>Form</code>](#Form)  

| Param |
| --- |
| name | 

<a name="Schema"></a>

## Schema ⇐ <code>RxJsonSchema</code>
**Kind**: global class  
**Extends**: <code>RxJsonSchema</code>  
**Implements**: [<code>LodgerSchema</code>](#LodgerSchema)  

* [Schema](#Schema) ⇐ <code>RxJsonSchema</code>
    * [.module.exports](#Schema.module.exports)
        * [new module.exports(form, [addCommonMethods])](#new_Schema.module.exports_new)
    * [.addField(field)](#Schema.addField)

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

<a name="Schema.addField"></a>

### Schema.addField(field)
**Kind**: static method of [<code>Schema</code>](#Schema)  

| Param | Type |
| --- | --- |
| field | <code>FieldCreator</code> | 

<a name="Subscriber"></a>

## Subscriber
**Kind**: global class  
**Implements**: <code>LodgerSubscriber</code>  
**Requires**: <code>module:Vue,R</code>  

* [Subscriber](#Subscriber)
    * [new Subscriber()](#new_Subscriber_new)
    * [.module.exports](#Subscriber.module.exports)
        * [new module.exports(name, taxonomy, criteriu)](#new_Subscriber.module.exports_new)
    * [._temp#subscribe([criteriu])](#Subscriber._temp+subscribe)

<a name="new_Subscriber_new"></a>

### new Subscriber()
<p>Creates a new subscriber for a specific taxonomy</p>

<a name="Subscriber.module.exports"></a>

### Subscriber.module.exports
**Kind**: static class of [<code>Subscriber</code>](#Subscriber)  
<a name="new_Subscriber.module.exports_new"></a>

#### new module.exports(name, taxonomy, criteriu)
<p>Creates an instance of Subscriber.</p>


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>eg. 'registru'</p> |
| taxonomy | [<code>Taxonomy</code>](#Taxonomy) |  |
| criteriu | <code>Criteriu</code> | <p>initial sort / filter criteria if it shall not use the default one</p> |

<a name="Subscriber._temp+subscribe"></a>

### Subscriber.\_temp#subscribe([criteriu])
<p>(re)Subscribes with given Criteria
happens internaly when criteriu is changed</p>

**Kind**: static method of [<code>Subscriber</code>](#Subscriber)  

| Param | Type |
| --- | --- |
| [criteriu] | <code>Criteriu</code> | 

<a name="Taxonomy"></a>

## Taxonomy
**Kind**: global class  
**Implements**: [<code>LodgerTaxonomy</code>](#LodgerTaxonomy)  
**Requires**: <code>module:Form</code>  

* [Taxonomy](#Taxonomy)
    * [new Taxonomy(name, form)](#new_Taxonomy_new)
    * [.module.exports](#Taxonomy.module.exports)
        * [new module.exports(collection, store)](#new_Taxonomy.module.exports_new)
    * [.name](#Taxonomy.name)
    * [.isMultipleSelect](#Taxonomy.isMultipleSelect) ⇒ <code>Boolean</code>
    * [.data](#Taxonomy.data)
    * [.subscribed](#Taxonomy.subscribed) ⇒ <code>Boolean</code>
    * [.trash(id)](#Taxonomy.trash) ⇒ <code>RxDocument.&lt;T&gt;</code>
    * [.put(data)](#Taxonomy.put) ⇒ <code>RxDocument.&lt;Taxonomie&gt;</code>
    * [.search(input)](#Taxonomy.search)
    * [.subscribe([subscriberName], [criteriuCerut])](#Taxonomy.subscribe) ⇒ <code>Promise.&lt;Subscriber.&lt;T&gt;&gt;</code>
    * [.unsubscribeAll([subscriberName])](#Taxonomy.unsubscribeAll) ⇒ <code>Promise</code>

<a name="new_Taxonomy_new"></a>

### new Taxonomy(name, form)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>Taxonomie</code> | <p>name of the form</p> |
| form | [<code>Form</code>](#Form) | <p>the constructed form item</p> |

<a name="Taxonomy.module.exports"></a>

### Taxonomy.module.exports
**Kind**: static class of [<code>Taxonomy</code>](#Taxonomy)  
<a name="new_Taxonomy.module.exports_new"></a>

#### new module.exports(collection, store)
<p>Creates an instance of Taxonomy.</p>


| Param | Type |
| --- | --- |
| collection | <code>RxCollection.&lt;T&gt;</code> | 
| store | <code>Store.&lt;T&gt;</code> | 

<a name="Taxonomy.name"></a>

### Taxonomy.name
<p>name getter</p>

**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Read only**: true  
<a name="Taxonomy.isMultipleSelect"></a>

### Taxonomy.isMultipleSelect ⇒ <code>Boolean</code>
**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Boolean</code> - <p>if taxonomy represents a multiple select choice</p>  
**Read only**: true  
<a name="Taxonomy.data"></a>

### Taxonomy.data
<p>Returns all data from subscribers</p>

**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Read only**: true  
<a name="Taxonomy.subscribed"></a>

### Taxonomy.subscribed ⇒ <code>Boolean</code>
**Kind**: static property of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Boolean</code> - <p>if subscribed anywhere</p>  
**Read only**: true  
<a name="Taxonomy.trash"></a>

### Taxonomy.trash(id) ⇒ <code>RxDocument.&lt;T&gt;</code>
<p>Removes a Document by ID from the collection</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>RxDocument.&lt;T&gt;</code> - <p>removed document</p>  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="Taxonomy.put"></a>

### Taxonomy.put(data) ⇒ <code>RxDocument.&lt;Taxonomie&gt;</code>
<p>Inserts/upserts a new item in DB</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>RxDocument.&lt;Taxonomie&gt;</code> - <p>the fresh document</p>  

| Param | Type |
| --- | --- |
| data | <code>Object</code> | 

<a name="Taxonomy.search"></a>

### Taxonomy.search(input)
<p>Cauta in searchMap</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  

| Param | Description |
| --- | --- |
| input | <p>string de cautat</p> |

<a name="Taxonomy.subscribe"></a>

### Taxonomy.subscribe([subscriberName], [criteriuCerut]) ⇒ <code>Promise.&lt;Subscriber.&lt;T&gt;&gt;</code>
<p>Subscribes</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  
**Returns**: <code>Promise.&lt;Subscriber.&lt;T&gt;&gt;</code> - <p>the unwatcher for subscriber</p>  

| Param | Type | Default |
| --- | --- | --- |
| [subscriberName] | <code>string</code> | <code>&quot;&#x27;main&#x27;&quot;</code> | 
| [criteriuCerut] | <code>Criteriu</code> |  | 

<a name="Taxonomy.unsubscribeAll"></a>

### Taxonomy.unsubscribeAll([subscriberName]) ⇒ <code>Promise</code>
<p>Kills all active listeners for a given subscriber name</p>

**Kind**: static method of [<code>Taxonomy</code>](#Taxonomy)  

| Param | Type | Default |
| --- | --- | --- |
| [subscriberName] | <code>string</code> | <code>&quot;&#x27;main&#x27;&quot;</code> | 

<a name="Monede"></a>

## Monede : <code>enum</code>
<p>Monede</p>

**Kind**: global enum  
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

<a name="strings"></a>

## strings : <code>enum</code>
<p>Accepted 'string's for a LodgerSchema field</p>

**Kind**: global enum  
<a name="sharedStoreMethods"></a>

## sharedStoreMethods
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | <p>methodName: action }</p> |

<a name="commonFields"></a>

## commonFields
<p>Common fields for all taxonomies</p>

**Kind**: global constant  
<a name="state"></a>

## state
<p>Preferences MODULE</p>

**Kind**: global constant  
<a name="get_bigrams"></a>

## get\_bigrams
<p>Helpers</p>

**Kind**: global constant  
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

