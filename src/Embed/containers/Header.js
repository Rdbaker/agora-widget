import { connect } from 'react-redux';

import { setViewAndType, changeContainerClass } from 'modules/ui/actions';
import { IframeViews, IframeViewTypes } from 'modules/ui/constants';
import { CHAT_BUTTON_CLASSNAME } from 'shared/iframeClasses';
import HeaderComponent from 'components/Header';


const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(changeContainerClass(CHAT_BUTTON_CLASSNAME));
    dispatch(setViewAndType({
      view: IframeViews.CHAT_BUTTON,
      type: IframeViewTypes.NONE,
    }));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)