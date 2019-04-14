import Taro, { PureComponent } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, ScrollView } from "@tarojs/components";
import Immutable from "immutable";
import { getTopicByTabNameAction, clearTopicAction } from "store/actions";
import configStore from "store/getStore";

@connect(
  state => {
    return {
      $list: state.getIn(["topic", "all"])
    };
  },
  dispatch => {
    return {
      getTopicByTabNameAction: ({ page }) =>
        dispatch(getTopicByTabNameAction({ page, tab: "all" })),
      clearTopicAction: ({ tab }) => dispatch(clearTopicAction({ tab }))
    };
  }
)
class AllTab extends PureComponent {
  constructor(props) {
    super(props);
    Object.assign(this, this.props.ownProps);
  }
  state = {
    refreshing: true
  };

  currentPage = 1;

  loadData = async (page = 1, isResetCurrentPage) => {
    const { payload } = await this.props.getTopicByTabNameAction({
      page
    });

    const store = configStore();
    console.log("state", store.getState().toJS());

    if (isResetCurrentPage) {
      this.currentPage = 1;
    }

    // if (success) {
    //   page !== 1 && (this.currentPage = page);
    //   this.setState({
    //     refreshing: false
    //   });
    // } else {
    //   page !== 1 && (this.currentPage = page - 1);
    //   this.setState({
    //     refreshing: false
    //   });
    // }
  };

  onRefresh = () => {
    this.props.clearTopicAction({
      tab
    });
    this.loadData(1, true);
  };

  onEndReached = () => {
    return this.loadData(this.currentPage + 1);
  };

  onItemPressed = (content, title) => {
    return this.props.navigation.navigate("/detail", {
      content,
      title
    });
  };

  componentDidMount = async () => {
    this.loadData(1, true);
  };

  $tempList = Immutable.List();

  componentWillReceiveProps(nextProps) {
    if (nextProps.$list.size === 0 && this.props.$list.size !== 0) {
      this.$tempList = this.props.$list;
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 150px;'
          lowerThreshold='20'
          upperThreshold='20'
          onScrolltoupper={this.onScrolltoupper}
          onScroll={this.onScroll}
        >
          <View> 1111 </View>
        </ScrollView>
      </View>
    );
  }
}

export default AllTab;
