/**
 * WordPress dependencies
 */
 import apiFetch from '@wordpress/api-fetch'
 import { dispatch } from '@wordpress/data'
 import { MediaUpload } from '@wordpress/media-utils'
 import { createElement, render } from '@wordpress/element'
 import { addAction, addFilter } from '@wordpress/hooks'
 
 /**
  * Slots
  */
 import RankMathAfterEditor from '@slots/AfterEditor'
 import RankMathAdvancedTab from '@slots/AdvancedTab'
 import RankMathAfterFocusKeyword from '@slots/AfterFocusKeyword'
 
 /**
  * Internal dependencies
  */
 import Editor from '../rankMathEditor'
 import DataCollector from './DataCollector'
//  import rankMathSettingsBar from './settings-bar'
 import rankMathPrimaryTerm from './primary-term'
 import App from './components/App'
 
 const replaceMediaUpload = () => MediaUpload
 
 class AvadaEditor extends Editor {
     setup( dataCollector ) {
         apiFetch.use( apiFetch.createRootURLMiddleware( rankMath.api.root ) )
         apiFetch.use( apiFetch.createNonceMiddleware( rankMath.restNonce ) )
         this.registerSlots = this.registerSlots.bind( this )
         addAction( 'rank_math_loaded', 'rank-math', this.registerSlots, 0 )
         addFilter(
             'editor.MediaUpload',
             'rank-math/replace-media-upload',
             replaceMediaUpload
         )
         super.setup( dataCollector )
     }
 
     /**
      * Register slots.
      */
     registerSlots() {
         this.RankMathAfterEditor = RankMathAfterEditor
         this.RankMathAfterFocusKeyword = RankMathAfterFocusKeyword
         this.RankMathAdvancedTab = RankMathAdvancedTab
         this.slots = {
             AfterEditor: RankMathAfterEditor,
             AfterFocusKeyword: RankMathAfterFocusKeyword,
             AdvancedTab: RankMathAdvancedTab,
         }
     }
 
     updatePermalink( slug ) {
         dispatch( 'rank-math' ).updatePermalink( slug )
     }
 
     updatePermalinkSanitize( slug ) {
         slug = this.assessor.getResearch( 'slugify' )( slug )
         dispatch( 'rank-math' ).updatePermalink( slug )
     }
 }
 
 // NOTE: For future reference, Avada has its own document ready event:
 // `document.addEventListener( 'ETDOMContentLoaded', function() {} )`
 

 jQuery( window ).on( 'load', function() {
    window.rankMathEditor = new AvadaEditor()
    window.rankMathGutenberg = window.rankMathEditor
    window.rankMathEditor.setup( new DataCollector() )
    // rankMathSettingsBar.init()
    new rankMathPrimaryTerm()
    render(
        createElement( App ),
        document.getElementById( 'rank-math-rm-app-root' )
    )
    dispatch( 'rank-math' ).refreshResults()

    console.log( 'RM is Loaded' )
 } )