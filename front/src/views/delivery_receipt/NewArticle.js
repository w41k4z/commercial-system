import React from 'react'
import { handleInputNumberFormat } from '../NumberFormatter'
import PropTypes from 'prop-types'

const NewArticle = (props) => {
  const { articles } = props
  return (
    <tr className="article-line">
      <td className="text-center w-3x pt-2">
        <input type="checkbox" name="isChecked" />
      </td>
      <td className="w-10x">
        <div className="mb-1 form-group">
          <select className="form-control form-select form-select-sm tbl-wfx kot-table font-sm">
            <option value="1" selected="">
              -- Séléctioner article --
            </option>
            {articles.map((article, index) => {
              return (
                <>
                  <option value={article.id}>{article.name}</option>
                </>
              )
            })}
          </select>
        </div>
      </td>
      <td className="w-10x">
        <div className="mb-1 form-group">
          <input className="form-control form-control-sm font-sm" type="text" name="description" />
        </div>
      </td>
      <td className="w-10x">
        <div className="mb-1 form-group">
          <input
            className="form-control form-control-sm font-sm number-input"
            type="text"
            name="quantity"
            onChange={handleInputNumberFormat}
          />
        </div>
      </td>
      <td className="w-10x">
        <div className="mb-1 form-group">
          <select className="form-control form-select form-select-sm tbl-wfx kot-table font-sm">
            <option value="1" selected="">
              -- Unité --
            </option>
            {articles.map((article, index) => {
              return (
                <>
                  <option value={article.id}>{article.unit}</option>
                </>
              )
            })}
          </select>
        </div>
      </td>
      <td className="w-10x">
        <div className="mb-1 form-group">
          <input
            className="form-control form-control-sm font-sm number-input hiddenColumns"
            type="text"
            name="sale_price"
            onChange={handleInputNumberFormat}
          />
        </div>
      </td>
      <td className="w-10x">
        <div className="mb-1 form-group">
          <input
            className="form-control form-control-sm font-sm number-input hiddenColumns"
            type="text"
            name="total_sale_price"
            onChange={handleInputNumberFormat}
          />
        </div>
      </td>
    </tr>
  )
}
NewArticle.propTypes = {
  articles: PropTypes.array.isRequired,
}
export default NewArticle
