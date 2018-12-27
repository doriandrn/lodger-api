## Classes

<dl>
<dt><a href="#Lodger">Lodger</a></dt>
<dd></dd>
<dt><a href="#LodgerError">LodgerError</a></dt>
<dd><p>Error logger</p></dd>
<dt><a href="#FormError">FormError</a></dt>
<dd><p>Error logger for forms</p></dd>
<dt><a href="#Form">Form</a></dt>
<dd><p>Form class</p></dd>
</dl>

## Members

<dl>
<dt><a href="#strings">strings</a></dt>
<dd><p>Private item types for FormItemCreator -&gt; RxDB</p></dd>
<dt><a href="#Errors">Errors</a></dt>
<dd><p>Form Errors Definition</p>
<p>TODO: account for translations</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#sharedStoreMethods">sharedStoreMethods</a></dt>
<dd></dd>
<dt><a href="#formsPath">formsPath</a></dt>
<dd><p>path to forms -&gt; load on the fly</p></dd>
<dt><a href="#fields">fields</a></dt>
<dd><p>o cheltuiala = parte dintr-o factura</p></dd>
<dt><a href="#vueHelperObj">vueHelperObj</a></dt>
<dd><p>More like a schema of a simple holder item</p></dd>
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
<dt><a href="#traverse">traverse(obiectul, fn)</a></dt>
<dd><p>Traverseaza un obiect cu o functie</p></dd>
<dt><a href="#getTaxonomyConfig">getTaxonomyConfig(taxonomie)</a></dt>
<dd><p>Returneaza config-ul pentru o taxonomie sau default</p></dd>
<dt><a href="#getCriteriu">getCriteriu(taxonomie, criteriuCerut)</a></dt>
<dd><p>Criteriu default pentru o taxonmoie ceruta</p></dd>
<dt><a href="#no$">no$(str)</a></dt>
<dd><p>Scoate &#39;$&#39; de la inceputul unui string</p></dd>
<dt><a href="#spleet">spleet(str)</a></dt>
<dd><p>Imparte un string de mutatie (&#39;asociatie/INCASEAZA&#39;)</p></dd>
<dt><a href="#slugify">slugify(text)</a></dt>
<dd><p>slug-ifica... destul de descriptiv :)</p></dd>
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

<a name="Lodger"></a>

## Lodger
**Kind**: global class  

* [Lodger](#Lodger)
    * _instance_
        * [._activeDocument](#Lodger+_activeDocument)
        * [.taxonomiesWithoutReference](#Lodger+taxonomiesWithoutReference) ⇒ <code>Array</code>
        * [.plugins](#Lodger+plugins)
        * [.getters](#Lodger+getters)
        * [.preferences](#Lodger+preferences)
        * [.activeReferencesIds](#Lodger+activeReferencesIds) ⇒ <code>Object</code>
        * [.notify()](#Lodger+notify)
        * [.put(taxonomie, data)](#Lodger+put)
        * [.trash(taxonomie, id)](#Lodger+trash)
        * [.select(taxonomie, id)](#Lodger+select)
        * [.search(input)](#Lodger+search)
        * [.subscribe()](#Lodger+subscribe) ⇒ <code>Subscriber</code>
        * [.setPreference()](#Lodger+setPreference)
        * [.destroy()](#Lodger+destroy)
        * [.export()](#Lodger+export)
        * [.import()](#Lodger+import)
        * [.unsubscribeAll(subscriberName)](#Lodger+unsubscribeAll)
    * _static_
        * [.build(options)](#Lodger.build) ⇒ [<code>Lodger</code>](#Lodger)
        * [.use(plugin)](#Lodger.use)

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
<a name="Lodger+notify"></a>

### lodger.notify()
<p>Notifies the user about an update/change</p>
<ul>
<li>Store action wrapper -</li>
</ul>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  
<a name="Lodger+put"></a>

### lodger.put(taxonomie, data)
<p>Adds / updates an entry in the DB</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  

| Param | Type | Description |
| --- | --- | --- |
| taxonomie | <code>Taxonomie</code> |  |
| data | <code>any</code> | <p>any -&gt; usually Object</p> |

<a name="Lodger+trash"></a>

### lodger.trash(taxonomie, id)
<p>Removes a Document from the DB</p>

**Kind**: instance method of [<code>Lodger</code>](#Lodger)  

| Param |
| --- |
| taxonomie | 
| id | 

<a name="Lodger+select"></a>

### lodger.select(taxonomie, id)
<p>select an item
brings in the active Document from DB</p>

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

### lodger.subscribe() ⇒ <code>Subscriber</code>
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
<a name="Form"></a>

## Form
<p>Form class</p>

**Kind**: global class  

* [Form](#Form)
    * _instance_
        * [.value()](#Form+value)
    * _static_
        * [.load(name)](#Form.load)

<a name="Form+value"></a>

### form.value()
<p>Makes a Vue-ready $data {object} suitable to be completed
by the user in the end form
as it will turn reactive</p>
<p>for new forms, values are all undefined</p>

**Kind**: instance method of [<code>Form</code>](#Form)  
<a name="Form.load"></a>

### Form.load(name)
<p>Loads a 'known' form by name</p>

**Kind**: static method of [<code>Form</code>](#Form)  

| Param |
| --- |
| name | 

<a name="strings"></a>

## strings
<p>Private item types for FormItemCreator -&gt; RxDB</p>

**Kind**: global variable  
<a name="Errors"></a>

## Errors
<p>Form Errors Definition</p>
<p>TODO: account for translations</p>

**Kind**: global variable  
<a name="sharedStoreMethods"></a>

## sharedStoreMethods
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | <p>methodName: action }</p> |

<a name="formsPath"></a>

## formsPath
<p>path to forms -&gt; load on the fly</p>

**Kind**: global constant  
<a name="fields"></a>

## fields
<p>o cheltuiala = parte dintr-o factura</p>

**Kind**: global constant  
<a name="vueHelperObj"></a>

## vueHelperObj
<p>More like a schema of a simple holder item</p>

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

<a name="traverse"></a>

## traverse(obiectul, fn)
<p>Traverseaza un obiect cu o functie</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obiectul | <code>object</code> | <p>de traversat</p> |
| fn | <code>function</code> | <p>callback -&gt; cheie, valoare</p> |

<a name="getTaxonomyConfig"></a>

## getTaxonomyConfig(taxonomie)
<p>Returneaza config-ul pentru o taxonomie sau default</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| taxonomie | <code>string</code> | 

<a name="getCriteriu"></a>

## getCriteriu(taxonomie, criteriuCerut)
<p>Criteriu default pentru o taxonmoie ceruta</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| taxonomie | <code>string</code> |  |
| criteriuCerut | <code>object</code> | <p>poate fi diferit decat default</p> |

<a name="no$"></a>

## no$(str)
<p>Scoate '$' de la inceputul unui string</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="spleet"></a>

## spleet(str)
<p>Imparte un string de mutatie ('asociatie/INCASEAZA')</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="slugify"></a>

## slugify(text)
<p>slug-ifica... destul de descriptiv :)</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

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

