const CustomArrayField = props => {
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
  };
  return (
    <div key={props.index} className={props.className}>
      <div className={props.hasToolbar ? 'col-xs-9' : 'col-xs-12'}>{props.children}</div>

      {props.hasToolbar && (
        <div className="col-xs-3 array-item-toolbox">
          <div className="btn-group" style={{ display: 'flex', justifyContent: 'space-around' }}>
            {(props.hasMoveUp || props.hasMoveDown) && (
              <i
                icon="arrow-up"
                className="fa fa-arrow-up"
                aria-hidden="true"
                tabIndex="-1"
                style={btnStyle}
                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                onClick={props.onReorderClick(props.index, props.index - 1)}
              />
            )}

            {(props.hasMoveUp || props.hasMoveDown) && (
              <i
                icon="arrow-down"
                className="fa fa-arrow-down"
                aria-hidden="true"
                tabIndex="-1"
                style={btnStyle}
                disabled={props.disabled || props.readonly || !props.hasMoveDown}
                onClick={props.onReorderClick(props.index, props.index + 1)}
              />
            )}

            {props.hasRemove && (
              <i
                type="danger"
                icon="remove"
                className="fa fa-times"
                tabIndex="-1"
                style={btnStyle}
                disabled={props.disabled || props.readonly}
                onClick={props.onDropIndexClick(props.index)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AddButton({ onClick, disabled }) {
  return (
    <div className="row">
      <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
        <i
          type="info"
          icon="plus"
          className="fa fa-plus"
          aria-hidden="true"
          tabIndex="0"
          onClick={onClick}
          disabled={disabled}
        />
      </p>
    </div>
  );
}

const onReorderClick = (index, newIndex) => {
  return event => {
    if (event) {
      event.preventDefault();
      event.target.blur();
    }
    const { formData, onChange } = this.props;
    onChange(
      formData.map((item, i) => {
        if (i === newIndex) {
          return formData[index];
        } else if (i === index) {
          return formData[newIndex];
        }
          return item;

      }),
      { validate: true },
    );
  };
};
