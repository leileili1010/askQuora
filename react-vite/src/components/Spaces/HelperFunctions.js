import { useNavigate} from 'react-router-dom';

export const useNavigateToTopic = () => {
    const navigate = useNavigate();

    const navigateToTopic = (topicName) => {
        const encodedTopicName = encodeURIComponent(topicName);
        navigate(`/topics/${encodedTopicName}`);
    };

    return navigateToTopic;
};