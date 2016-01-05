import {Component, Provider, Injector, ComponentMetadata, View, ViewMetadata, Injectable, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {FirebaseService} from '../../src/firebase.service';
import {FirebaseServiceProvider} from '../../src/firebase.service.provider';

import {
    AsyncTestCompleter,
    beforeEach,
    ddescribe,
    xdescribe,
    describe,
    dispatchEvent,
    expect,
    iit,
    inject,
    beforeEachProviders,
    it,
    xit,
    TestComponentBuilder,
    ComponentFixture
} from 'angular2/testing_internal';

@Component({
    selector: 'test-component',
    template: '<p>{{data}}</p>'
})
class TestComponent {
    constructor(public firebase:FirebaseService) {

    }
}

export function main() {
    describe('FirebaseService', function () {
        beforeEach(function () {
            this.element = document.createElement('test-component');
            document.body.appendChild(this.element);
        });

        afterEach(function () {
            if (this.element) {
                document.body.removeChild(this.element);
            }
        });

        it('should be able to use custom provider to build FirebaseSerivce', function () {
            var firebase = {};


            return bootstrap(TestComponent, [provide(FirebaseService, {useValue: firebase})]).then(component => {
                expect(component.instance).not.toBe(null);
                expect(component.instance.firebase).toBe(firebase);
                component.dispose();
            });
        });

        it('should be able to use FirebaseServiceProvider to build FirebaseService', function () {
            var firebase = {};

            return bootstrap(TestComponent, [FirebaseServiceProvider, provide('Firebase', {useValue: firebase})]).then(component => {
                expect(component.instance).not.toBe(null);
                expect(component.instance.firebase).toBe(firebase);
                component.dispose();
            });
        });
    });
}