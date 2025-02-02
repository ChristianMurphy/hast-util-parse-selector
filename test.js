import test from 'tape'
import {parseSelector} from './index.js'

test('parseSelector()', (t) => {
  t.deepEqual(
    parseSelector(),
    {
      type: 'element',
      tagName: 'div',
      properties: {},
      children: []
    },
    'should return an empty element without selector'
  )

  t.deepEqual(
    parseSelector('foo'),
    {
      type: 'element',
      tagName: 'foo',
      properties: {},
      children: []
    },
    'should return an element with a tag-name when given a tag-name'
  )

  t.deepEqual(
    parseSelector(null, 'g'),
    {
      type: 'element',
      tagName: 'g',
      properties: {},
      children: []
    },
    'should return an `defaultTagName` if no tag name is defined in `selector` (#1)'
  )

  t.deepEqual(
    parseSelector('#id', 'g'),
    {
      type: 'element',
      tagName: 'g',
      properties: {id: 'id'},
      children: []
    },
    'should return an `defaultTagName` if no tag name is defined in `selector` (#2)'
  )

  t.deepEqual(
    parseSelector('.bar'),
    {
      type: 'element',
      tagName: 'div',
      properties: {className: ['bar']},
      children: []
    },
    'should return a `div` element when given a class'
  )

  t.deepEqual(
    parseSelector('#bar'),
    {
      type: 'element',
      tagName: 'div',
      properties: {id: 'bar'},
      children: []
    },
    'should return a `div` element when given an ID'
  )

  t.deepEqual(
    parseSelector('foo#bar.baz.qux'),
    {
      type: 'element',
      tagName: 'foo',
      properties: {
        id: 'bar',
        className: ['baz', 'qux']
      },
      children: []
    },
    'should return attributes'
  )

  t.deepEqual(
    parseSelector('foo#bar#baz'),
    {
      type: 'element',
      tagName: 'foo',
      properties: {id: 'baz'},
      children: []
    },
    'should return the last ID if multiple are found'
  )

  t.deepEqual(
    parseSelector('Foo'),
    {
      type: 'element',
      tagName: 'Foo',
      properties: {},
      children: []
    },
    'should *not* case the tag-name'
  )

  t.end()
})
