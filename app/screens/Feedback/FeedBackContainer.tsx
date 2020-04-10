import * as React from 'react';
import FeedBackScreen from './FeedBackScreen';
import { inject, observer } from 'mobx-react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

export interface AppProps extends NavigationStackScreenProps {
	feedback: any;
}

@inject('feedback')
@observer
export default class FeedBackContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.feedback.fetchFeedBack();
	}

	public render() {
		const { dataFeedBack } = this.props.feedback;
		return <FeedBackScreen navigation={this.props.navigation} dataFeedBack={dataFeedBack} />;
	}
}
