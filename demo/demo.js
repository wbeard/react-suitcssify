'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { default as ButtonWithDecorator } from './ButtonWithDecorator';
import { default as ButtonWithMixin } from './ButtonWithMixin';
import { default as ButtonWithUtility } from './ButtonWithUtility';

ReactDOM.render(
  <div>
    <div>
      <h2>Decorator examples</h2>
      <div className="group">
        <ButtonWithDecorator kind="primary" size="small">Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="primary" size="medium">Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="primary" size="large" disabled>Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="primary" size="large" utilities="pullRight">Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="primary" size="large" utilities="pullRight" className="someOtherClass">Hello</ButtonWithDecorator>
      </div>
      <div className="group">
        <ButtonWithDecorator kind="secondary" size="small">Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="secondary" size="medium">Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="secondary" size="large" disabled>Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="secondary" size="large" utilities="pullRight">Hello</ButtonWithDecorator>
        <ButtonWithDecorator kind="secondary" size="large" utilities="pullRight" className="someOtherClass">Hello</ButtonWithDecorator>
      </div>
    </div>
    <hr />
    <div>
      <h2>Mixin examples</h2>
      <div className="group">
        <ButtonWithMixin kind="primary" size="small">Hello</ButtonWithMixin>
        <ButtonWithMixin kind="primary" size="medium">Hello</ButtonWithMixin>
        <ButtonWithMixin kind="primary" size="large" disabled>Hello</ButtonWithMixin>
        <ButtonWithMixin kind="primary" size="large" utilities="pullRight">Hello</ButtonWithMixin>
        <ButtonWithMixin kind="primary" size="large" utilities="pullRight" className="someOtherClass">Hello</ButtonWithMixin>
      </div>
      <div className="group">
        <ButtonWithMixin kind="secondary" size="small">Hello</ButtonWithMixin>
        <ButtonWithMixin kind="secondary" size="medium">Hello</ButtonWithMixin>
        <ButtonWithMixin kind="secondary" size="large" disabled>Hello</ButtonWithMixin>
        <ButtonWithMixin kind="secondary" size="large" utilities="pullRight">Hello</ButtonWithMixin>
        <ButtonWithMixin kind="secondary" size="large" utilities="pullRight" className="someOtherClass">Hello</ButtonWithMixin>
      </div>
    </div>
    <hr />
    <div>
      <h2>Utility method examples</h2>
      <div className="group">
        <ButtonWithUtility kind="primary" size="small">Hello</ButtonWithUtility>
        <ButtonWithUtility kind="primary" size="medium">Hello</ButtonWithUtility>
        <ButtonWithUtility kind="primary" size="large" disabled>Hello</ButtonWithUtility>
        <ButtonWithUtility kind="primary" size="large" utilities="pullRight">Hello</ButtonWithUtility>
        <ButtonWithUtility kind="primary" size="large" utilities="pullRight" className="someOtherClass">Hello</ButtonWithUtility>
      </div>
      <div className="group">
        <ButtonWithUtility kind="secondary" size="small">Hello</ButtonWithUtility>
        <ButtonWithUtility kind="secondary" size="medium">Hello</ButtonWithUtility>
        <ButtonWithUtility kind="secondary" size="large" disabled>Hello</ButtonWithUtility>
        <ButtonWithUtility kind="secondary" size="large" utilities="pullRight">Hello</ButtonWithUtility>
        <ButtonWithUtility kind="secondary" size="large" utilities="pullRight" className="someOtherClass">Hello</ButtonWithUtility>
      </div>
    </div>
  </div>,
  document.getElementById('app')
);
