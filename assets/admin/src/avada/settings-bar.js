/* globals MutationObserver */

/**
 * External dependencies
 */
import jQuery from 'jquery'

/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data'
import { createElement, render } from '@wordpress/element'

/**
 * Internal dependencies
 */
import SettingsBar from './components/SettingsBar'

export default {
	init() {
		this.cacheProps()
		this.initSettingsBar()
		this.addEventListeners()
	},

	cacheProps() {
		this.$document = jQuery( document )
		this.$body = jQuery( 'body' )

		// RankMath
		this.rmModalHiddingTimer = null
		this.rmPrevModalActiveState = false
		this.rmSettingsBarMediaQuery = window.matchMedia( '(min-width: 768px)' )
		this.rmSettingsBarRootSelector = '#rank-math-rm-settings-bar-root'
		this.$rmSettingsBarRoot = jQuery( this.rmSettingsBarRootSelector ).detach()
	},

	initSettingsBar() {
		this.onRmSettingsBarMediaQueryChange()
		render( createElement( SettingsBar ), this.$rmSettingsBarRoot[ 0 ] )
		this.removePositionalClassNames( this.$body, 'rank-math-et-settings-bar-is' )
	},

	addEventListeners() {
		this.$document.on( 'click', this.onDocumentClick.bind( this ) )
		this.rmSettingsBarMediaQuery.addListener(
			this.onRmSettingsBarMediaQueryChange.bind( this )
		)
		this.etSettingsBarObserver.observe(
			this.$etPageSettingsBar[ 0 ],
			{ attributeFilter: [ 'class' ] }
		)
	},

	onDocumentClick( e ) {
		this.hideModalOnOutsideClick( e.target )
	},

	onRmSettingsBarMediaQueryChange() {
		this.detachRmSettingsBar()
	},

	attachRmSettingsBar( position ) {
		if ( this.isRmSettingsBarAttached() ) {
			return
		}
		this.toggleRmSettingsBarClassNames( position )
			this.$etPageSettingsBarToggleButton
				.after( this.$rmSettingsBarRoot )
	},

	detachRmSettingsBar() {
		if ( ! this.isRmSettingsBarAttached() ) {
			return
		}
		this.$rmSettingsBarRoot = this.$etPageSettingsBar.find(
			this.rmSettingsBarRootSelector
		).detach()
	},

	toggleRmSettingsBarClassNames( position ) {
		this.removePositionalClassNames( this.$rmSettingsBarRoot )
		this.$rmSettingsBarRoot.addClass( `rank-math-rm-settings-bar-root-${ position }` )
		this.$rmSettingsBarRoot.toggleClass(
			[
				'rank-math-rm-settings-bar-root-is-mobile',
				`rank-math-rm-settings-bar-root-is-mobile-${ position }`,
			].join( ' ' ),
			! this.rmSettingsBarMediaQuery.matches
		)
		this.$rmSettingsBarRoot.toggleClass(
			[
				'rank-math-rm-settings-bar-root-is-desktop',
				`rank-math-rm-settings-bar-root-is-desktop-${ position }`,
			].join( ' ' ),
			this.rmSettingsBarMediaQuery.matches
		)
	},

	isRmSettingsBarAttached() {
		return jQuery.contains( document.documentElement, this.$rmSettingsBarRoot[ 0 ] )
	},

	removePositionalClassNames( $elem, namespace = '' ) {
		const positionClassNameEndings = [
				`${ namespace }-left`,
				`${ namespace }-right`,
				`${ namespace }-top`,
				`${ namespace }-top-left`,
				`${ namespace }-top-right`,
				`${ namespace }-bottom`,
				`${ namespace }-bottom-left`,
				`${ namespace }-bottom-right`,
			].join( '|' ),
			positionRegex = new RegExp( `(${ positionClassNameEndings })$`, 'gim' )
		$elem.removeClass( ( index, classes ) => {
			const classNames = classes.split( ' ' ),
				positionClassNames = []
			for ( const className of classNames ) {
				if ( positionRegex.test( className ) ) {
					positionClassNames.push( className )
				}
			}
			return positionClassNames
		} )
	},

	hideModalOnOutsideClick( elem ) {
		if ( ! select( 'rank-math' ).isDiviRankMathModalActive() ) {
			return
		}

		const seoModalSelector = '.rank-math-rm-modal',
			previewModalSelector = '.components-modal__screen-overlay.rank-math-modal-overlay',
			modalToggle = '.rank-math-rm-modal-toggle-button'

		if (
			! jQuery( elem ).parents( seoModalSelector ) &&
			! elem.closest( previewModalSelector ) &&
			! elem.closest( modalToggle ) &&
			! elem.contains( document.querySelector( seoModalSelector ) )
		) {
			dispatch( 'rank-math' ).toggleIsDiviRankMathModalActive( false )
		}
	},
}
